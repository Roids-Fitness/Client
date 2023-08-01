import React, {useState} from "react";
import "./components.css";
import { Form, Row, Col, InputGroup, Button} from 'react-bootstrap';
import { Helmet } from "react-helmet";


function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
    <Helmet><title>Register with us - Roids Fitness Gym</title></Helmet>
    <div className="background-container">
      <div className="container">
        <div className="form-container">
          <div className="title">Registration Form</div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="textValidation">
                <Form.Label>First name</Form.Label>
                <Form.Control required type="text" pattern="^[A-Za-z\s\-']+$" placeholder="First name" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="textValidation">
                <Form.Label>Last name</Form.Label>
                <Form.Control required type="text" pattern="^[A-Za-z\s\-']+$" placeholder="Last name" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="emailValidation">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control type="email" placeholder="Email" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address (e.g.,
                    john@example.com).
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="passwordValidation">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must contain at least 8 characters, including at
                    least one uppercase letter, one lowercase letter, and one
                    numeric digit.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="streetValidation">
                <Form.Label>Street</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Street"
                    pattern="^[0-9]+[A-Za-z0-9\s,-.'#/]*$"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid street address.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="textValidation">
                <Form.Label>Suburb</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Suburb"
                  pattern="^[A-Za-z\s\-']+$"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid suburb.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="stateDropdown">
                <Form.Label>State</Form.Label>
                <Form.Control as="select" required>
                  <option value="">Select State</option>
                  <option value="NSW">NSW</option>
                  <option value="VIC">VIC</option>
                  <option value="QLD">QLD</option>
                  <option value="SA">SA</option>
                  <option value="WA">WA</option>
                  <option value="TAS">TAS</option>
                  <option value="NT">NT</option>
                  <option value="ACT">ACT</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a state.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="numberValidation">
                <Form.Label>Postcode</Form.Label>
                <Form.Control type="number" placeholder="Postcode" pattern="^\d{4}$" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid postcode.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="numberValidation">
                <Form.Label>Mobile</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control type="number" placeholder="Mobile" pattern="^04\d{8}$" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid mobile phone number (e.g.
                    0412345678).
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Row>
              <Col md="12" className="d-flex justify-content-center mt-3">
                <Button className="button" type="submit">
                  Sign up
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div></>
  );
}

export default Register;

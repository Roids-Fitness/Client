import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const email = formData.email;
      const password = formData.password;
      try {
        const response = await validateCredentials(email, password);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        alert("Login successful!");
        navigate("/class");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials. Please try again.");
        } else {
          console.error("Error while logging in:", error);
          alert(`An error occurred while logging in.${error}`);
        }
      }
    }

    setValidated(true);
  };

  const validateCredentials = async (email, password) => {
    const response = await axios.post("http://localhost:3001/user/login", {
      email,
      password,
    });
    return response.data;
  };

  return (
    <>
      <Helmet>
        <title>Login - Roids Fitness Gym</title>
      </Helmet>
      <div className="background-container" id="login-background-container">
        <div className="container">
          <div className="form-container">
            <div className="title">Login</div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="emailValidation">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      autoComplete="username"
                      onChange={handleChange}
                      value={formData.email}
                    />
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
                      name="password"
                      placeholder="Password"
                      required
                      autoComplete="current-password"
                      onChange={handleChange}
                      value={formData.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a password.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row>
                <Col md="12">
                  <Link className="register-link" to="/user/register">
                    Not a member? Register here
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col md="12" className="d-flex justify-content-center mt-3">
                  <Button className="button" type="submit">
                    Login
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, InputGroup, Button, Alert } from 'react-bootstrap';

function Login() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Simulate API call to validate credentials (replace this with your actual backend API call)
      const email = form.elements.email.value;
      const password = form.elements.password.value;
      const isValidCredentials = await validateCredentials(email, password);

      if (isValidCredentials) {
        // Login successful, redirect to dashboard or home page
        // Replace '/dashboard' with the appropriate URL
        window.location.href = '/dashboard';
      } else {
        setError('Invalid email or password. Please try again.');
        setValidated(true);
      }
    }
  };

  const validateCredentials = async (email, password) => {
    // Perform API call to validate the email and password against the database
    // Return true if the credentials are valid, false otherwise
    // Replace this with your actual backend validation logic
    // For now, let's assume the credentials are valid if the email is 'test@example.com' and the password is 'Test1234'
    return email === 'test@example.com' && password === 'Test1234';
  };

  return (
    <div className="background-container">
      <div className="container">
        <div className="form-container">
          <div className="title">Login</div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}
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
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address (e.g., john@example.com).
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
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a password.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Col md="12">
                <Link className="register-link" to="/register">
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
  );
}

export default Login;
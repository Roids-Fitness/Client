import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * This is the login page for the website, it allows users to login to their account.
 * @returns login component
 */
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_URL;

  /**
   * Function that handles the change of the form data
   * @param {*} event 
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Function that handles the submission of the form data, and logs the user in
   * @param {*} event 
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = formData.email;
    const password = formData.password;
    try {
      const response = await validateCredentials(email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      alert("Login successful!");
      navigate("/class");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        console.error("Error while logging in:", error);
        alert(`An error occurred while logging in.${error}`);
      }
    }
  };

  /**
   * Function that validates the user's credentials
   * @param {*} email 
   * @param {*} password 
   * @returns token and user data which is to be stored in local storage
   */
  const validateCredentials = async (email, password) => {
    const response = await axios.post(`${apiURL}/user/login`, {
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
            {/** If the user is logged in, display a message, otherwise display the login form */}
            {!localStorage.getItem("token") || !localStorage.getItem("user") ? (
              <div>
                <div className="title">Login</div>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="emailValidation">
                      <Form.Label>Email</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                          autoComplete="username"
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="passwordValidation">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          required
                          autoComplete="current-password"
                          onChange={handleChange}
                          value={formData.password}
                        />
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
            ) : (
              <div className="logged-in-message">
                You are currently logged in as{" "}
                {JSON.parse(localStorage.getItem("user")).firstName}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

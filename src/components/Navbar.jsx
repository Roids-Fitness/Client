import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom/dist";
import {ReactComponent as Logo} from '../logo.svg'

export default class NavbarComponent extends Component {
  render() {
    return (
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand to={"/"}>
              <Logo
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="Roids Fitness logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to={"/"}>Home</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"/class-timetable"}>Classes</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"/register"}>Register</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"/login"}>Login</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </div>
    );
  }
}

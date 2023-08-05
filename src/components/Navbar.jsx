import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";

/** This Navbar component is on the top of every page.
 * 
 * @returns navbar component
 */
function NavbarComponent() {
  const [userFirstName, setUserFirstName] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Function to get user's first name from localStorage
  useEffect(() => {
    const userLocalStorageData = localStorage.getItem("user");
    if (userLocalStorageData) {
      const user = JSON.parse(userLocalStorageData);
      setUserFirstName(user.firstName);
    } else {
      setUserFirstName(null);
    }
  }, []);
  
  // Function to update token state when localStorage changes
  const handleTokenChange = () => {
    setToken(localStorage.getItem("token"));
  };

  // Add event listener to listen for changes in localStorage
  useEffect(() => {
    window.addEventListener("storage", handleTokenChange);

    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, []); 

  // Function to logout user, remove token and user from localStorage
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
  };

  return (
    <div>
      <Navbar data-bs-theme="dark" expand="lg" className="bg-3A3A41">
        <Container>
          <Navbar.Brand href={"/"}>
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
                <Link to={"/"} className="white-text-no-hyperlink">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/class"} className="white-text-no-hyperlink">
                  Classes
                </Link>
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {/* Show user's first name and logout button if user is logged in */}
              {userFirstName && token ? (
                <>
                  <Navbar.Text className="white-text-no-hyperlink">
                    Welcome {userFirstName}! |
                  </Navbar.Text>
                  <Nav.Link>
                    <Link to={"/"} onClick={logout} className="white-text-no-hyperlink">
                      Logout
                    </Link>
                  </Nav.Link>
                </>
              ) : (
                <>
                {/* Shows Register and Login Link otherwise*/}
                  <Nav.Link>
                    <Link
                      to={"/user/register"}
                      className="white-text-no-hyperlink"
                    >
                      Register
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      to={"/user/login"}
                      className="white-text-no-hyperlink"
                    >
                      Login
                    </Link>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default NavbarComponent;

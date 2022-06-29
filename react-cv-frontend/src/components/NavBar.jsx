import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../icon/Logo_superhr.png";

export const NavBar = () => {
  const iconPic = "https://img.icons8.com/cotton/344/coffee-to-go.png";
  return (
    <Navbar
      className="navbar-app shadow"
      // bg="light"
      // variant="light"
      // sticky="top"
      // expand="md"
    >
      <Container className="align-items-center">
        <Navbar.Brand as={Link} to="/" href="#home">
          <img alt="" src={logo} height="30" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
        <Navbar.Collapse>
          <Nav>
            <Container className="nav-items">
              <Nav.Link as={Link} to="/newApp">
                New
              </Nav.Link>
            </Container>
            <Container className="nav-items">
              <Nav.Link as={Link} to="/searchApp">
                Search
              </Nav.Link>
            </Container>
            <Container className="nav-items">
              <Nav.Link as={Link} to="/manageSkill">
                Skill
              </Nav.Link>
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

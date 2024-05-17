import React from "react";
import { Navbar, Nav, Button, Container, Row, Col } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Row className="w-100">
          <Col xs="auto">
            <Navbar.Brand href="/">LOAN MANAGEMENT</Navbar.Brand>
          </Col>
          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/admin">Loan Lists</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Button variant="primary" className="ml-2">
              <Nav.Link href="/approve">Manage Loans</Nav.Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;

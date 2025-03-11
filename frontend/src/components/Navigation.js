import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import agroIntelLogo from '../Images/AgroIntelLogo.png';

const Navigation = () => {
  return (
    <Navbar variant="dark" expand="lg" className="py-2 navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src={agroIntelLogo} 
            alt="AgroIntel Logo" 
            height="40" 
            className="d-inline-block align-top me-2" 
          />
          <span className="fw-bold" style={{ color: '#5a8f00', fontSize: '1.5rem' }}>Agro</span>
          <span className="ms-1" style={{ fontSize: '1.5rem' }}>Intel</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2 nav-link-hover">Home</Nav.Link>
            <Nav.Link as={Link} to="/dashboard" className="mx-2 nav-link-hover">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/weather" className="mx-2 nav-link-hover">Weather</Nav.Link>
            <Nav.Link as={Link} to="/chatbot" className="mx-2 nav-link-hover">AI Assistant</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
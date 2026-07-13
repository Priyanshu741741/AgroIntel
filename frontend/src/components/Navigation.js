import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import agroIntelLogo from '../Images/AgroIntelLogo.png';

const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/',          label: 'Home',        icon: 'bi-house-fill' },
    { to: '/dashboard', label: 'Dashboard',   icon: 'bi-cpu-fill' },
    { to: '/weather',   label: 'Weather',     icon: 'bi-cloud-sun-fill' },
    { to: '/chatbot',   label: 'AI Assistant',icon: 'bi-chat-dots-fill' },
  ];

  return (
    <Navbar
      variant="dark"
      expand="lg"
      sticky="top"
      className="py-2 navbar"
      style={{
        background: scrolled
          ? 'rgba(6, 13, 20, 0.97)'
          : 'rgba(6, 13, 20, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src={agroIntelLogo} alt="AgroIntel Logo" height="36" />
          <span style={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.5px' }}>
            <span style={{ color: '#22c55e' }}>Agro</span>
            <span style={{ color: '#f0fdf4' }}>Intel</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-1">
            {links.map(({ to, label, icon }) => {
              const active = location.pathname === to;
              return (
                <Nav.Link
                  key={to}
                  as={Link}
                  to={to}
                  className="nav-link-hover d-flex align-items-center gap-2"
                  style={{
                    color: active ? '#22c55e' : 'rgba(240,253,244,0.75)',
                    fontWeight: active ? 600 : 500,
                    fontSize: '0.9rem',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    background: active ? 'rgba(34,197,94,0.1)' : 'transparent',
                    border: active ? '1px solid rgba(34,197,94,0.25)' : '1px solid transparent',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <i className={`bi ${icon}`} style={{ fontSize: '0.9rem' }}></i>
                  {label}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

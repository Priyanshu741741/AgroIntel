import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Chatbot from '../components/Chatbot';

const ChatbotPage = () => (
  <Container className="py-5">
    <div className="mb-4">
      <h2 style={{
        fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.5px',
        background: 'linear-gradient(135deg, #f0fdf4, #22c55e)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        marginBottom: 6,
      }}>
        AI Crop Assistant
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 0 }}>
        Ask anything about crop diseases, soil health, pest control, and farming best practices.
      </p>
    </div>
    <Row>
      <Col lg={8} className="mx-auto">
        <Chatbot />
      </Col>
    </Row>
  </Container>
);

export default ChatbotPage;
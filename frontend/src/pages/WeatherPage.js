import React from 'react';
import { Container } from 'react-bootstrap';
import WeatherDisplay from '../components/WeatherDisplay';

const WeatherPage = () => (
  <Container className="py-5">
    <div className="mb-4">
      <h2 style={{
        fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.5px',
        background: 'linear-gradient(135deg, #f0fdf4, #22c55e)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        marginBottom: 6,
      }}>
        Weather Monitoring
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 0 }}>
        Real-time weather conditions and 5-day forecast for your location to help plan your farming activities.
      </p>
    </div>
    <WeatherDisplay />
  </Container>
);

export default WeatherPage;
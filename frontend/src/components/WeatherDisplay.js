import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { getWeatherData } from '../services/api';

const getWeatherEmoji = (desc = '') => {
  const d = desc.toLowerCase();
  if (d.includes('thunder')) return '⛈️';
  if (d.includes('snow'))    return '❄️';
  if (d.includes('rain'))    return '🌧️';
  if (d.includes('drizzle')) return '🌦️';
  if (d.includes('fog') || d.includes('mist')) return '🌫️';
  if (d.includes('cloud'))   return '☁️';
  if (d.includes('clear'))   return '☀️';
  return '🌤️';
};

const StatCard = ({ icon, value, label }) => (
  <div className="weather-stat-card">
    <span className="weather-stat-icon">{icon}</span>
    <div className="weather-stat-value">{value}</div>
    <div className="weather-stat-label">{label}</div>
  </div>
);

const WeatherDisplay = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        try {
          const data = await getWeatherData(lat, lon);
          setWeather(data);
        } catch {
          setError('Failed to fetch weather data. Check your OpenWeatherMap API key in the backend .env file.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location access denied. Please allow location in your browser settings.');
        setLoading(false);
      }
    );
  }, []);

  if (loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" style={{ color: 'var(--green-primary)', width: 48, height: 48 }} />
      <p style={{ color: 'var(--text-muted)', marginTop: 16 }}>Fetching your location…</p>
    </div>
  );

  if (error) return (
    <div style={{
      background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
      borderRadius: '14px', padding: '20px 24px', color: '#fca5a5',
    }}>
      <i className="bi bi-exclamation-triangle-fill me-2" />{error}
    </div>
  );

  if (!weather) return null;

  const { current, forecast } = weather;

  return (
    <div className="weather-container">
      {/* Current conditions */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(22,163,74,0.12), rgba(34,197,94,0.06))',
        border: '1px solid rgba(34,197,94,0.2)', borderRadius: '20px',
        padding: '28px 32px', marginBottom: '28px',
      }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 4 }}>
              Current Conditions
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#22c55e', lineHeight: 1 }}>
              {Math.round(current.temp)}°C
            </div>
            <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: 4, textTransform: 'capitalize' }}>
              {getWeatherEmoji(current.description)} {current.description}
            </div>
          </div>
        </div>
        <Row className="g-3">
          <Col xs={6} md={3}>
            <StatCard icon="💧" value={`${current.humidity}%`} label="Humidity" />
          </Col>
          <Col xs={6} md={3}>
            <StatCard icon="💨" value={`${current.wind_speed} m/s`} label="Wind Speed" />
          </Col>
          <Col xs={6} md={3}>
            <StatCard icon="🌡️" value={`${Math.round(current.temp)}°C`} label="Temperature" />
          </Col>
          <Col xs={6} md={3}>
            <StatCard icon={getWeatherEmoji(current.description)} value="Now" label={current.description} />
          </Col>
        </Row>
      </div>

      {/* Forecast */}
      <div style={{ marginBottom: 12 }}>
        <h5 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
          5-Day Forecast
        </h5>
        <Row className="g-3">
          {forecast.map((day, i) => (
            <Col xs={6} md={4} key={i}>
              <div className="weather-forecast-card">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
                <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>{getWeatherEmoji(day.description)}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#22c55e' }}>{Math.round(day.temp)}°C</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'capitalize', marginTop: 4 }}>
                  {day.description}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 6 }}>
                  <i className="bi bi-droplet-fill me-1" style={{ color: '#22c55e' }} />
                  {day.humidity}%
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default WeatherDisplay;
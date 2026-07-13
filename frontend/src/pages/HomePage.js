import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-wrapper">

      {/* ---- Hero ---- */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <div>
                <span className="hero-tag">
                  <span className="hero-tag-dot" />
                  AI-Powered Agriculture
                </span>

                <h1 className="hero-title">
                  Smart Farming Starts with <span className="accent">AgroIntel</span>
                </h1>

                <p className="hero-subtitle">
                  Upload a photo of your crop and get instant AI-powered disease detection,
                  real-time weather insights, and personalized care recommendations — all in one platform.
                </p>

                <div className="hero-actions">
                  <Link to="/dashboard" className="btn-hero-primary">
                    <i className="bi bi-cpu-fill" />
                    Analyze Your Crops
                  </Link>
                  <Link to="/chatbot" className="btn-hero-secondary">
                    <i className="bi bi-chat-dots-fill" />
                    Ask AI Assistant
                  </Link>
                </div>

                <div className="hero-stats">
                  <div>
                    <div className="hero-stat-value">3</div>
                    <div className="hero-stat-label">Health Categories</div>
                  </div>
                  <div>
                    <div className="hero-stat-value">Real-Time</div>
                    <div className="hero-stat-label">Weather Data</div>
                  </div>
                  <div>
                    <div className="hero-stat-value">Gemini AI</div>
                    <div className="hero-stat-label">Powered Chatbot</div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="hero-image-wrap">
                <div className="hero-glow-ring" />
                <div className="hero-image-card">
                  <img
                    src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80"
                    alt="Healthy crop field"
                  />
                </div>
                <div className="hero-badge hero-badge-top">
                  <span className="hero-badge-icon"><i className="bi bi-shield-check-fill" /></span>
                  Instant Health Detection
                </div>
                <div className="hero-badge hero-badge-bottom">
                  <span className="hero-badge-icon"><i className="bi bi-cloud-sun-fill" /></span>
                  Live Weather Sync
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ---- Features ---- */}
      <section className="features-section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Revolutionize Your Farming</h2>
            <div className="title-underline" />
            <p className="section-description">
              AgroIntel combines computer vision, live weather data, and large language models
              to give every farmer an intelligent co-pilot.
            </p>
          </div>

          <Row className="g-4">
            {[
              {
                icon: 'bi-camera-fill',
                title: 'Instant Analysis',
                desc: 'Snap a photo of your crop and receive AI-powered health assessment with treatment recommendations in seconds.',
              },
              {
                icon: 'bi-cloud-sun-fill',
                title: 'Weather Integration',
                desc: 'Access real-time weather data and 5-day forecasts tailored to your location to optimise planting schedules.',
              },
              {
                icon: 'bi-chat-dots-fill',
                title: 'AI Crop Assistant',
                desc: 'Chat with our Gemini-powered assistant for expert advice on diseases, pests, soil health, and more.',
              },
              {
                icon: 'bi-graph-up-arrow',
                title: 'Smart Recommendations',
                desc: 'Get personalised care plans based on the specific health category detected in your crops.',
              },
              {
                icon: 'bi-globe2',
                title: 'Works Anywhere',
                desc: 'Geolocation-aware weather and crop advice that adapts to your region and climate zone.',
              },
              {
                icon: 'bi-shield-check-fill',
                title: 'Reliable Detection',
                desc: 'Powered by a TensorFlow MobileNetV2 model trained to classify healthy, diseased, and nutrient-deficient crops.',
              },
            ].map(({ icon, title, desc }) => (
              <Col md={6} lg={4} key={title}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className={`bi ${icon}`} />
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ---- How It Works ---- */}
      <section className="how-it-works">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">How It Works</h2>
            <div className="title-underline" />
            <p className="section-description">
              Three steps from a photo to a full diagnosis — no expertise required.
            </p>
          </div>

          <Row className="g-4">
            {[
              { n: '1', title: 'Upload a Photo',        desc: 'Take a clear photo of the affected plant and upload it to the dashboard.' },
              { n: '2', title: 'AI Analysis',           desc: 'Our deep learning model analyses leaf patterns for disease or nutrient deficiency.' },
              { n: '3', title: 'Get Recommendations',   desc: 'Receive personalised treatment advice, care tips, and next steps instantly.' },
            ].map(({ n, title, desc }) => (
              <Col md={4} key={n}>
                <div className="step-card">
                  <div className="step-number">{n}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ---- CTA ---- */}
      <section className="cta-section">
        <Container>
          <div className="cta-card">
            <h2>Ready to grow smarter?</h2>
            <p>
              Join farmers using AI to protect their crops and maximise yields.
              No account needed — start analysing immediately.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/dashboard" className="btn-hero-primary">
                <i className="bi bi-upload" /> Analyse Now
              </Link>
              <Link to="/weather" className="btn-hero-secondary">
                <i className="bi bi-cloud-sun" /> Check Weather
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
};

export default HomePage;

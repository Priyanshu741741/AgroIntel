import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NetflixStyleCarousel from '../components/NetflixStyleCarousel';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-wrapper">
      {/* Hero Carousel Section */}
      <section className="hero-section">
        <NetflixStyleCarousel 
          features={[
            {
              title: "AI-Powered Crop Health Analysis",
              description: "Upload photos of your crops and get instant health assessment using our advanced AI model.",
              image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
              link: "/dashboard",
              buttonText: "Analyze Your Crops"
            },
            {
              title: "Real-Time Weather Integration",
              description: "Access real-time weather data for your location to make informed farming decisions.",
              image: "https://images.unsplash.com/photo-1561583534-09e822ba83ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
              link: "/weather",
              buttonText: "Check Weather"
            },
            {
              title: "Personalized Crop Recommendations",
              description: "Receive tailored care suggestions based on crop health analysis and local weather conditions.",
              image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
              link: "/dashboard",
              buttonText: "Get Recommendations"
            },
            {
              title: "AI Crop Assistant",
              description: "Chat with our intelligent AI-powered assistant for expert advice on crop care and disease management.",
              image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
              link: "/chatbot",
              buttonText: "Ask the Assistant"
            }
          ]}
        />
      </section>
      
      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h2 className="section-title">Revolutionize Your Farming</h2>
              <div className="title-underline"></div>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={4}>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-camera-fill"></i>
                </div>
                <h3>Instant Analysis</h3>
                <p>Upload crop photos and get immediate AI-powered health assessment and treatment recommendations.</p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-cloud-sun-fill"></i>
                </div>
                <h3>Weather Integration</h3>
                <p>Access real-time weather data and forecasts to optimize your farming schedule and crop care.</p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-chat-square-text-fill"></i>
                </div>
                <h3>AI Assistant</h3>
                <p>Get expert advice and answers to your farming questions from our advanced AI crop assistant.</p>
              </div>
            </Col>
          </Row>
          
          <Row className="mt-5">
            <Col className="text-center">
              <Link to="/dashboard">
                <Button variant="primary" size="lg" className="get-started-btn">
                  Get Started Now
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works py-5">
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h2 className="section-title">How It Works</h2>
              <div className="title-underline"></div>
              <p className="section-description">
                Our app uses advanced AI models to identify crop health issues and provide personalized recommendations.
              </p>
            </Col>
          </Row>
          
          <Row className="g-4 steps-container">
            <Col md={4}>
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Upload Photos</h3>
                <p>Take photos of your crops and upload them to our secure platform for analysis.</p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>AI Analysis</h3>
                <p>Our advanced AI model analyzes your crops for diseases, nutrient deficiencies, and other issues.</p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Get Recommendations</h3>
                <p>Receive personalized treatment recommendations and care advice for your specific crops.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
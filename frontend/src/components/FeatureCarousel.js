import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/FeatureCarousel.css';

const FeatureCarousel = ({ features }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Function to move to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === features.length - 1 ? 0 : prevIndex + 1
    );
  }, [features.length]);
  
  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  };
  
  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
    // Reset the auto-play timer when manually changing slides
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100);
  };
  
  // Auto-play functionality
  useEffect(() => {
    let interval;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, nextSlide]);
  
  return (
    <div className="feature-carousel">
      {/* Navigation Arrows */}
      <div className="carousel-arrow prev" onClick={prevSlide}>
        &lt;
      </div>
      <div className="carousel-arrow next" onClick={nextSlide}>
        &gt;
      </div>
      
      {/* Carousel Container */}
      <div 
        className="carousel-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {features.map((feature, index) => (
          <div key={index} className="carousel-slide">
            <Card className="h-100">
              <Card.Img variant="top" src={feature.image} />
              <Card.Body>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Text>{feature.description}</Card.Text>
                <Link to={feature.link}>
                  <Button variant="primary">{feature.buttonText}</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Indicators */}
      <div className="carousel-indicators">
        {features.map((_, index) => (
          <div 
            key={index} 
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;
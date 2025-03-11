import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/NetflixStyleCarousel.css';

const NetflixStyleCarousel = ({ features }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Function to move to the next slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === features.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition time
  }, [features.length, isTransitioning]);
  
  // Function to move to the previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? features.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition time
  }, [features.length, isTransitioning]);
  
  // Function to go to a specific slide
  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
    
    // Reset the auto-play timer when manually changing slides
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100);
  };
  
  // Auto-play functionality
  useEffect(() => {
    let interval;
    
    if (isAutoPlaying && !isTransitioning) {
      interval = setInterval(() => {
        nextSlide();
      }, 7000); // Change slide every 7 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, nextSlide, isTransitioning]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);
  
  if (!features || features.length === 0) {
    return null;
  }
  
  const currentFeature = features[currentIndex];
  
  return (
    <div className="netflix-carousel">
      {/* Background Image */}
      <div 
        className={`carousel-background ${isTransitioning ? 'transitioning' : ''}`}
        style={{ backgroundImage: `url(${currentFeature.image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />
      
      {/* Content */}
      <div className="carousel-content">
        <h1 className="feature-title">{currentFeature.title}</h1>
        <p className="feature-description">{currentFeature.description}</p>
        <Link to={currentFeature.link}>
          <Button variant="primary" className="feature-button">
            {currentFeature.buttonText || 'Learn More'}
          </Button>
        </Link>
      </div>
      
      {/* Navigation Arrows */}
      <button className="carousel-arrow prev" onClick={prevSlide} aria-label="Previous slide">
        <span>&lt;</span>
      </button>
      <button className="carousel-arrow next" onClick={nextSlide} aria-label="Next slide">
        <span>&gt;</span>
      </button>
      
      {/* Indicators */}
      <div className="carousel-indicators">
        {features.map((_, index) => (
          <button 
            key={index} 
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NetflixStyleCarousel;
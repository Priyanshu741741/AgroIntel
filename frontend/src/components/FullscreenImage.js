import React, { useState, useEffect } from 'react';
import '../styles/FullscreenImage.css';

const FullscreenImage = ({ imageUrl, isOpen, onClose, caption }) => {
  const [active, setActive] = useState(false);
  
  // Handle escape key press to close the fullscreen view
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Small delay to allow the CSS transition to work properly
      setTimeout(() => setActive(true), 10);
    } else {
      setActive(false);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  // Handle click outside the image to close
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('fullscreen-overlay')) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={`fullscreen-overlay ${active ? 'active' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="fullscreen-image-container">
        <button 
          className="fullscreen-close" 
          onClick={onClose}
          aria-label="Close fullscreen view"
        >
          <i className="bi bi-x-lg"></i>
        </button>
        
        <img 
          src={imageUrl} 
          alt={caption || 'Fullscreen view'} 
          className="fullscreen-image"
        />
        
        {caption && (
          <div className="fullscreen-caption">{caption}</div>
        )}
      </div>
    </div>
  );
};

export default FullscreenImage;
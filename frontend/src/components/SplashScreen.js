import React, { useEffect, useState } from 'react';
import '../styles/SplashScreen.css';
import agroIntelLogo from '../Images/AgroIntelLogo.png';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoActive, setLogoActive] = useState(false);
  const [logoFade, setLogoFade] = useState(false);

  useEffect(() => {

    const activateTimer = setTimeout(() => {
      setLogoActive(true);
    }, 500);

    const fadeTimer = setTimeout(() => {
      setLogoFade(true);
    }, 2500);


    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

  
    return () => {
      clearTimeout(activateTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-screen">
      <div className={`logo-container ${logoActive ? 'active' : ''} ${logoFade ? 'fade' : ''}`}>
        <img src={agroIntelLogo} alt="AgroIntel Logo" className="splash-image" />
      </div>
      <h1 className="splash-logo-header">
        <span className={`splash-logo ${logoActive ? 'active' : ''} ${logoFade ? 'fade' : ''}`}>Agro</span>
        <span className={`splash-logo ${logoActive ? 'active' : ''} ${logoFade ? 'fade' : ''}`} style={{ animationDelay: '0.4s' }}>Intel</span>
      </h1>
      <p className={`splash-tagline ${logoActive ? 'active' : ''} ${logoFade ? 'fade' : ''}`}>
        Combining agriculture with intelligence
      </p>
    </div>
  );
};

export default SplashScreen;
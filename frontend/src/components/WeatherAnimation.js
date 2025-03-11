import React, { useEffect, useState } from 'react';
import '../styles/WeatherAnimations.css';

const WeatherAnimation = ({ weatherCondition }) => {
  const [animationType, setAnimationType] = useState('default');
  const [raindrops, setRaindrops] = useState([]);
  const [sunRays, setSunRays] = useState([]);


  useEffect(() => {
    if (!weatherCondition) {
      setAnimationType('default');
      return;
    }

    const condition = weatherCondition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
      setAnimationType('rainy');
     
      const drops = [];
      for (let i = 0; i < 50; i++) {
        drops.push({
          id: i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 2 + 1}s`,
          animationDelay: `${Math.random() * 5}s`
        });
      }
      setRaindrops(drops);
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
      setAnimationType('cloudy');
    } else if (condition.includes('clear') || condition.includes('sun')) {
      setAnimationType('sunny');
   
      const rays = [];
      for (let i = 0; i < 12; i++) {
        rays.push({
          id: i,
          rotation: `${i * 30}deg`,
          animationDelay: `${i * 0.1}s`
        });
      }
      setSunRays(rays);
    } else {
      setAnimationType('default');
    }
  }, [weatherCondition]);


  const renderAnimation = () => {
    switch (animationType) {
      case 'sunny':
        return (
          <div className="sunny-animation">
            <div className="sun">
              {sunRays.map(ray => (
                <div 
                  key={ray.id} 
                  className="sun-ray" 
                  style={{
                    transform: `rotate(${ray.rotation})`,
                    animationDelay: ray.animationDelay
                  }}
                />
              ))}
            </div>
          </div>
        );
      case 'cloudy':
        return (
          <div className="weather-animation-container cloudy-animation">
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
            <div className="cloud cloud-4"></div>
            <div className="cloud cloud-5"></div>
            <div className="small-cloud small-cloud-1"></div>
            <div className="small-cloud small-cloud-2"></div>
            <div className="small-cloud small-cloud-3"></div>
          </div>
        );
      case 'rainy':
        return (
          <div className="rainy-animation">
            {raindrops.map(drop => (
              <div 
                key={drop.id} 
                className="raindrop" 
                style={{
                  left: drop.left,
                  animation: `rainFall ${drop.animationDuration} linear infinite ${drop.animationDelay}`
                }}
              />
            ))}
            <div className="cloud cloud-1" style={{ opacity: 0.7 }}></div>
            <div className="cloud cloud-2" style={{ opacity: 0.8 }}></div>
          </div>
        );
      default:
        return <div className="default-animation"></div>;
    }
  };

  return (
    <div className="weather-animation-container">
      {renderAnimation()}
    </div>
  );
};

export default WeatherAnimation;
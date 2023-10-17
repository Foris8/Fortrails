import React, { useState, useEffect } from "react";
import './RollingImages.css'; 
import logo from './fortrails.png';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const imageUrls = [
  "https://s3.amazonaws.com/assets.alltrails.com/guides/homepage/Banff_Top-Picks_AdobeStock_293462639.jpg",
  "https://s3.amazonaws.com/assets.alltrails.com/guides/homepage/Yosemite_Top-Picks_ben-petchel-uY50b2dqKUQ-unsplash.jpg",
  "https://s3.amazonaws.com/assets.alltrails.com/guides/homepage/Zion_Top-Picks_AdobeStock_64497030.jpeg",
  "https://s3.amazonaws.com/assets.alltrails.com/guides/homepage/Lake-District_Top-Picks_AdobeStock_384355289.jpg"
];

const parkNames = [
  "Banff National Park",
  "Yosemite National Park",
  "Zion National Park",
  "Lake District National Park"
];


function RollingImages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentParkName, setCurrentParkName] = useState(parkNames[0]);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setCurrentParkName(parkNames[currentIndex]); // Update park name whenever currentIndex changes
  }, [currentIndex]);

  return (
    <div className="rolling-container">
      <div className="rolling-content">
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Fortrails" />
            <span>Fortrails</span>
        </div>

        <div>
            <p className="large-text">Guides to</p>
            <p className="large-text park-name">{currentParkName}</p>
            <p className="small-text">Introducing 200+ national park guides</p>
        </div>
        
        <button onClick={()=>history.push('/explore')}>Explore</button>
      </div>
      
      <div className="rolling-images-container">
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            className={`image ${index === currentIndex ? "active zoom-in" : "zoom-out"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default RollingImages;

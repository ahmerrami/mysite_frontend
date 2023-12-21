import React, { useState, useEffect } from 'react';
import "./Slider.css";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the index, and reset to 0 if it exceeds the length of the images array
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change the interval as needed (here it's set to 3000 milliseconds or 3 seconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  return (
    <div className="imageSlider">
      <img className="imageSlide" src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
    </div>
  );
};

function Slider() {
  const images = [
    'Billetterie.jpg',
    'vte1.jpg',
    'esc1.jpg',
    'crc1.jpg',
    // Add more image URLs as needed
  ];

  return (
    <div className="App">
      <ImageSlider images={images} />
    </div>
  );
}

export default Slider
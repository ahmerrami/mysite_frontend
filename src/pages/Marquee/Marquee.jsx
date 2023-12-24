import React from 'react';
import styles from './Marquee.module.css';
//import './Marquee.css'; // Import the CSS file for styling

const Marquee = () => {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeContent}>
        This text is scrolling from right to left in React!
      </div>
    </div>
  );
};

export default Marquee;
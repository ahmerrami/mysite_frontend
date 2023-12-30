import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

function Header({setActiveContent}){
    const [buttonColor, setButtonColor] = useState('black');
    useEffect(() => {
        // Function to be executed inside setInterval
        const changeColor = () => {
          // Toggle the color between red and blue
          setButtonColor((prevColor) => (prevColor === 'red' ? 'blue' : 'red'));
        };
    
        // Set up a setInterval to call changeColor every 1000 milliseconds (1 second)
        const intervalId = setInterval(changeColor, 1000);
    
        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
      }, []);
    const imageUrl = './Logo ST PNG.png';
    // Function to handle menu item clicks
    const handleMenuClick = (content) => {
        setActiveContent(content);
    };

    return(
        <header className={styles.header}>
            <img src={imageUrl} alt="Logo" className={styles.logo}/>
            <button onClick={() => handleMenuClick('home')}>Home</button>
            <button onClick={() => handleMenuClick('about')}>About</button>
            <button onClick={() => handleMenuClick('reference')}>Référence</button>
            <button onClick={() => handleMenuClick('omra')} style={{ backgroundColor: buttonColor, color:'white' }}>Omra</button>
            <button onClick={() => handleMenuClick('contact')}>Contact</button>
        </header>
    );
}

export default Header
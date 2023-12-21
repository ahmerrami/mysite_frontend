import React, { useState } from 'react';
import About from './About/About.jsx';
import Reference from './Reference/Reference.jsx';
import Contact from './Contact/Contact.jsx';
import Omra from './Omra/Omra.jsx';
import Slider from './Slider/Slider.jsx';
import './App.css';

function App() {
  // State to track the active content
  const [activeContent, setActiveContent] = useState('home');
  const imageUrl = './logo.png';

  // Function to handle menu item clicks
  const handleMenuClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div>
      {/* Menu items */}
      <header>
        <img src={imageUrl} alt="Logo" className="logo"/>
        <button onClick={() => handleMenuClick('home')}>Home</button>
        <button onClick={() => handleMenuClick('about')}>About</button>
        <button onClick={() => handleMenuClick('reference')}>Référence</button>
        <button onClick={() => handleMenuClick('omra')}>Omra</button>
        <button onClick={() => handleMenuClick('contact')}>Contact</button>
      </header>

      {/* Display content based on activeContent state */}
      <main>
        {activeContent === 'home' && <Slider/>}
        {activeContent === 'about' && <About/>}
        {activeContent === 'reference' && <Reference/>}
        {activeContent === 'omra' && <Omra/>}
        {activeContent === 'contact' && <Contact/>}
      </main>
      <footer>
          <p>&copy; supratourstravel.com {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App
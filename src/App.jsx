import React, { useState } from 'react';
import About from './pages/About/About.jsx';
import Reference from './pages/Reference/Reference.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Omra from './pages/Omra/Omra.jsx';
import Slider from './pages/Slider/Slider.jsx';
import Marquee from './pages/Marquee/Marquee.jsx';
import Header from './pages/Header/Header.jsx';

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
      <Header setActiveContent={setActiveContent}/>

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
      <Header setActiveContent={setActiveContent}/>
    </div>
    
  );
}

export default App
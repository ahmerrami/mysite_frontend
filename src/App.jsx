import React, { useState } from 'react';
import Header from './pages/Header/Header.jsx';
import Main from './pages/Main/Main.jsx';
import Footer from './pages/Footer/Footer.jsx';
import Marquee from './pages/Marquee/Marquee.jsx';

function App() {
  // State to track the active content
  const [activeContent, setActiveContent] = useState('home');
  

  return (
    <>
      <Header setActiveContent={setActiveContent}/>
      <Marquee/>
      <Main activeContent={activeContent}/>
      <Footer/>
    </>
    
  );
}

export default App
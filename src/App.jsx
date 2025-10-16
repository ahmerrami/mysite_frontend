// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './pages/About/About.jsx';
import Reference from './pages/Reference/Reference.jsx';

import Omra from './pages/Omra/Omra.jsx';
import AO from './pages/AO/AO.jsx';
import Slider from './pages/Slider/Slider.jsx';
import ContactsList from './pages/ContactList/ContactsList.jsx';

import './App.css';

// Import des fonctionnalités conditionnelles
import MultiStepForm from './pages/Stage/MultiStepForm.jsx';
import Conditions from './pages/Stage/Conditions.jsx';

// Import de la configuration des fonctionnalités
import { FEATURES, isFeatureEnabled } from './config/features.js';

const App = () => {
  const imageUrl = './logo.png';
  return (
      <Router>
        <nav className="modern-navbar">
          <div className="navbar-container">
            {/* Logo et marque */}
            <div className="navbar-brand">
              <Link to="/" className="brand-link">
                <img src={imageUrl} alt="Supratours Travel" className="brand-logo"/>
                <span className="brand-text">Supratours Travel</span>
              </Link>
            </div>

            {/* Menu de navigation */}
            <div className="navbar-menu">
              <Link to="/" className="nav-item">
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Accueil</span>
              </Link>
              <Link to="/about" className="nav-item">
                <span className="nav-icon">ℹ️</span>
                <span className="nav-text">À Propos</span>
              </Link>
              <Link to="/reference" className="nav-item">
                <span className="nav-icon">🏆</span>
                <span className="nav-text">Références</span>
              </Link>
              {isFeatureEnabled('OMRA') && FEATURES.OMRA.showInMenu && (
                <Link to="/omra" className="nav-item">
                  <span className="nav-icon">🕌</span>
                  <span className="nav-text">Omra</span>
                </Link>
              )}
              {isFeatureEnabled('APPELS_OFFRES') && FEATURES.APPELS_OFFRES.showInMenu && (
                <Link to="/ao" className="nav-item">
                  <span className="nav-icon">📋</span>
                  <span className="nav-text">Appels d'Offres</span>
                </Link>
              )}
              {isFeatureEnabled('STAGES') && FEATURES.STAGES.showInMenu && (
                <Link to="/stage" className="nav-item">
                  <span className="nav-icon">🎓</span>
                  <span className="nav-text">Stages</span>
                </Link>
              )}
              <Link to="/contact" className="nav-item contact-item">
                <span className="nav-icon">📞</span>
                <span className="nav-text">Contact</span>
              </Link>
            </div>

            {/* Bouton mobile menu (pour responsive) */}
            <div className="mobile-menu-toggle">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Slider />} />
          <Route path="/about" element={<About />} />
          <Route path="/reference" element={<Reference />} />
          {isFeatureEnabled('OMRA') && FEATURES.OMRA.showInRoutes && (
            <Route path="/omra" element={<Omra />} />
          )}
          {isFeatureEnabled('APPELS_OFFRES') && FEATURES.APPELS_OFFRES.showInRoutes && (
            <Route path="/ao" element={<AO />} />
          )}
          {isFeatureEnabled('STAGES') && FEATURES.STAGES.showInRoutes && (
            <Route path="/stage" element={<MultiStepForm />} />
          )}
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/contact" element={<ContactsList />} />
        </Routes> 
      </Router>
    
  );
};

export default App;
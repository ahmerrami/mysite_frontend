import React, { useState, useEffect } from 'react';
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
import { getFeatures, FEATURES as STATIC_FEATURES, isFeatureEnabled } from './config/features.js';

const App = () => {
  const imageUrl = './logo.png';
  
  // État pour les fonctionnalités dynamiques
  const [features, setFeatures] = useState({
    STAGES: { enabled: false, showInMenu: false, showInRoutes: false }
  });
  const [featuresLoaded, setFeaturesLoaded] = useState(false);

  // Charger les fonctionnalités au démarrage
  useEffect(() => {
    const loadFeatures = async () => {
      try {
        console.log('🔍 Chargement des fonctionnalités...');
        const dynamicFeatures = await getFeatures();
        console.log('✅ Fonctionnalités chargées:', dynamicFeatures);
        setFeatures(dynamicFeatures);
      } catch (error) {
        console.error('❌ Erreur lors du chargement des fonctionnalités:', error);
        // En cas d'erreur, garder les valeurs par défaut (stages désactivés)
      } finally {
        setFeaturesLoaded(true);
      }
    };

    loadFeatures();
  }, []);
  
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
              {STATIC_FEATURES.OMRA.enabled && STATIC_FEATURES.OMRA.showInMenu && (
                <Link to="/omra" className="nav-item">
                  <span className="nav-icon">🕌</span>
                  <span className="nav-text">Omra</span>
                </Link>
              )}
              {STATIC_FEATURES.APPELS_OFFRES.enabled && STATIC_FEATURES.APPELS_OFFRES.showInMenu && (
                <Link to="/ao" className="nav-item">
                  <span className="nav-icon">📋</span>
                  <span className="nav-text">Appels d'Offres</span>
                </Link>
              )}
              {featuresLoaded && features.STAGES?.showInMenu && (
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
          {STATIC_FEATURES.OMRA.enabled && STATIC_FEATURES.OMRA.showInRoutes && (
            <Route path="/omra" element={<Omra />} />
          )}
          {STATIC_FEATURES.APPELS_OFFRES.enabled && STATIC_FEATURES.APPELS_OFFRES.showInRoutes && (
            <Route path="/ao" element={<AO />} />
          )}
          {featuresLoaded && features.STAGES?.showInRoutes && (
            <Route path="/stage" element={<MultiStepForm />} />
          )}
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/contact" element={<ContactsList />} />
        </Routes> 
      </Router>
    
  );
};

export default App;
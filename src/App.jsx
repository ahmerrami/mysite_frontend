// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pages/About/About.jsx';
import Reference from './pages/Reference/Reference.jsx';

import Omra from './pages/Omra/Omra.jsx';
import AO from './pages/AO/AO.jsx';
import Slider from './pages/Slider/Slider.jsx';
import ContactsList from './pages/ContactList/ContactsList.jsx';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import des fonctionnalités conditionnelles
import MultiStepForm from './pages/Stage/MultiStepForm.jsx';
import Conditions from './pages/Stage/Conditions.jsx';

// Import de la configuration des fonctionnalités
import { FEATURES, isFeatureEnabled } from './config/features.js';

const App = () => {
  const imageUrl = './logo.png';
  return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">
            <img src={imageUrl}
            alt="Logo"
            width="80"
            height="60"
            className="d-inline-block align-top"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="ml-auto"> */}
            <Nav className="mr-auto justify-content-between w-100">
              <Nav.Link as={Link} to="/"><b>Home</b></Nav.Link>
              <Nav.Link as={Link} to="/about"><b>About</b></Nav.Link>
              <Nav.Link as={Link} to="/reference"><b>Références</b></Nav.Link>
              {isFeatureEnabled('OMRA') && FEATURES.OMRA.showInMenu && (
                <Nav.Link as={Link} to="/omra"><b>Omra</b></Nav.Link>
              )}
              {isFeatureEnabled('APPELS_OFFRES') && FEATURES.APPELS_OFFRES.showInMenu && (
                <Nav.Link as={Link} to="/ao"><b>Appels d offres</b></Nav.Link>
              )}
              {isFeatureEnabled('STAGES') && FEATURES.STAGES.showInMenu && (
                <Nav.Link as={Link} to="/stage"><b>Stages</b></Nav.Link>
              )}
              <Nav.Link as={Link} to="/contact"><b>Contacts</b></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
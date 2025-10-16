import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Step1({ formData, handleChange, handleNext, villes }) {
  const { civilite, nom, prenom, cin, dateN, tel, email, adress, ville } = formData;

  const validateStep = () => {
    if (!civilite || !nom || !prenom || !cin || !dateN || !tel || !email || !adress || !ville) {
      return false;
    }
    return true;
  };

  return (
    <>
        <h4>Informations personnelles</h4>
        <hr/>
      <Form.Group controlId="civilite">
        <Form.Label>Civilité</Form.Label>
        <Form.Select
          name="civilite"
          onChange={handleChange}
          value={civilite}
          required
        >
          <option value="">-- Civilité --</option>
          <option value="M.">M.</option>
          <option value="Mlle">Mlle</option>
          <option value="Mme">Mme</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="nom">
        <Form.Label>Nom</Form.Label>
        <Form.Control 
          type="text" 
          name="nom" 
          value={nom} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="prenom">
        <Form.Label>Prénom</Form.Label>
        <Form.Control 
          type="text" 
          name="prenom" 
          value={prenom} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="cin">
        <Form.Label>CIN</Form.Label>
        <Form.Control 
          type="text" 
          name="cin" 
          value={cin} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="dateN">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control 
          type="date" 
          name="dateN" 
          value={dateN} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="tel">
        <Form.Label>Téléphone</Form.Label>
        <Form.Control 
          type="text" 
          name="tel" 
          value={tel} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          name="email" 
          value={email} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="adress">
        <Form.Label>Adresse</Form.Label>
        <Form.Control 
          type="text" 
          name="adress" 
          value={adress} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ville</Form.Label>
        <Form.Control as="select" custom id="ville" name="ville" value={ville} onChange={handleChange} required>
        <option value="">--Ville--</option>
          {villes.map(ville => (
           <option key={ville.id} value={ville.id}>{ville.ville}</option>
          ))}          
        </Form.Control>
      </Form.Group>
      <hr/>
      <Button variant="primary" onClick={handleNext} disabled={!validateStep()}>Next</Button>
    </>
  );
}

export default Step1;
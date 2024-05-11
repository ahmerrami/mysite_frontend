import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Step2({ formData, handleChange, handlePrevious, handleNext, villes }) {
  const { niveau, ecole, specialite, villeEcole } = formData;

  const validateStep = () => {
    if (!niveau || !ecole || !specialite || !villeEcole) {
      return false;
    }
    return true;
  };

  return (
    <>
      <h4>Informations Education</h4>
      <hr/>
      <Form.Group controlId="niveau">
        <Form.Label>Niveau d'étude</Form.Label>
        <Form.Control 
          type="text" 
          name="niveau" 
          value={niveau} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="ecole">
        <Form.Label>Ecole</Form.Label>
        <Form.Control 
          type="text" 
          name="ecole" 
          value={ecole} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="specialite">
        <Form.Label>Spécialité</Form.Label>
        <Form.Control 
          type="text" 
          name="specialite" 
          value={specialite} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ville Ecolde</Form.Label>
        <Form.Control as="select" custom id="villeEcole" name="villeEcole" value={villeEcole} onChange={handleChange} required>
        <option value="">--Ville Ecole--</option>
          {villes.map(ville => (
           <option key={ville.id} value={ville.id}>{ville.ville}</option>
          ))}          
        </Form.Control>
      </Form.Group>
      <hr/>
      <Button variant="secondary" onClick={handlePrevious}>Previous</Button>{' '}
      <Button variant="primary" onClick={handleNext} disabled={!validateStep()}>Next</Button>
    </>
  );
}

export default Step2;
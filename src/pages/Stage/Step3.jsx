import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

function Step3({ formData, handleChange, handlePrevious, handleSubmit, loading, periodes }) {
  const { selectedPeriode, cv, lettre, isChecked } = formData;
  const [cvError, setCvError] = useState('');
  const [lettreError, setLettreError] = useState('');

  const validateStep = () => {
    if (!selectedPeriode || !cv || !lettre || !isChecked || cvError || lettreError) {
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const fileSizeMB = file.size / 1024 / 1024;
      if (fileSizeMB > 1) {
        if (name === 'cv') {
          setCvError('La taille du CV doit être inférieure à 1 Mo.');
        } else if (name === 'lettre') {
          setLettreError('La taille de la lettre de motivation doit être inférieure à 1 Mo.');
        }
      } else {
        if (name === 'cv') {
          setCvError('');
        } else if (name === 'lettre') {
          setLettreError('');
        }
      }

      handleChange(e); // Call the original handleChange function
    }
  };

  return (
    <>
      <h4>Dépot de dossier</h4>
      <hr/>
      <Form.Group>
        <Form.Label>Période de stage</Form.Label>
        <Form.Control as="select" custom id="selectedPeriode" name="selectedPeriode" value={selectedPeriode} onChange={handleChange} required>
          <option value="">--Période désirée--</option>
          {periodes.map(periode => (
            <option key={periode.id} value={periode.id}>{periode.periode}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="cv">
        <Form.Label>CV - format pdf</Form.Label>
        <Form.Control 
          type="file"
          name="cv"
          onChange={handleFileChange} 
          accept=".pdf"
          required 
        />
        {cvError && <Alert variant="danger">{cvError}</Alert>}
      </Form.Group>
      <Form.Group controlId="lettre">
        <Form.Label>Lettre de motivation - format pdf</Form.Label>
        <Form.Control 
          type="file"
          name="lettre"
          onChange={handleFileChange}
          accept=".pdf"
          required 
        />
        {lettreError && <Alert variant="danger">{lettreError}</Alert>}
      </Form.Group>
      <Form.Group controlId="isChecked">
        <Form.Check
          type="checkbox"
          id="conditions"
          name="isChecked"
          label={
            <>
              J'accepte{' '}
              <Link to="/conditions">les termes et conditions</Link>
            </>
          }
          checked={isChecked}
          onChange={handleChange}
        />
      </Form.Group>
      
      <hr/>
      <Button variant="secondary" onClick={handlePrevious}>Previous</Button>{' '}
      <Button variant="primary" onClick={handleSubmit} disabled={!validateStep() || loading}>Submit</Button>
    </>
  );
}

export default Step3;
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Step3({ formData, handleChange, handlePrevious, handleSubmit, loading, periodes }) {
  const { selectedPeriode, cv, lettre, isChecked } = formData;

  const validateStep = () => {
    if (!selectedPeriode || !cv || !lettre || !isChecked) {
      return false;
    }
    return true;
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
        <Form.Label>CV</Form.Label>
        <Form.Control 
          type="file"
          name="cv"
          onChange={handleChange} 
          accept=".pdf"
          required 
        />
      </Form.Group>
      <Form.Group controlId="lettre">
        <Form.Label>Lettre de motivation</Form.Label>
        <Form.Control 
          type="file"
          name="lettre"
          onChange={handleChange}
          accept=".pdf"
          required 
        />
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
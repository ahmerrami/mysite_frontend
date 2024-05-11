import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function MultiStepForm() {
  const [formData, setFormData] = useState({
    civilite : '',
    nom : '',
    prenom : '',
    cin : '',
    dateN : '',
    tel : '',
    email : '',
    adress : '',
    ville : 0,
    niveau : '',
    ecole : '',
    specialite : '',
    villeEcole : 0,
    selectedPeriode : 0,
    cv: null,
    lettre: null,
    isChecked: false,
  });
  const [step, setStep] = useState(1);
  const [villes, setVilles] = useState([]);
  const [periodes, setPeriodes] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch('https://errami.pythonanywhere.com/api/stages/villes/')
        .then(response => response.json())
        .then(data => setVilles(data))
        .catch(error => console.error('Error fetching villes:', error));
  }, []);

  useEffect(() => {
    fetch('https://errami.pythonanywhere.com/api/stages/periodes/')
        .then(response => response.json())
        .then(data => setPeriodes(data))
        .catch(error => console.error('Error fetching periodes:', error));
  }, []);

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
  
    setFormData((prevFormData) => {
      if (type === 'file') {
        const file = event.target.files[0];
        return { ...prevFormData, [name]: file };
      } else if (name === 'isChecked') { // Check if the checkbox is being updated
        return { ...prevFormData, isChecked: checked };
      } else {
        return { ...prevFormData, [name]: value };
      }
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('https://errami.pythonanywhere.com/api/stages/form-stage/create/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form and errors
      setFormData({
        civilite : '',
        nom : '',
        prenom : '',
        cin : '',
        dateN : '',
        tel : '',
        email : '',
        adress : '',
        ville : 0,
        niveau : '',
        ecole : '',
        specialite : '',
        villeEcole : 0,
        selectedPeriode : 0,
        cv: null,
        lettre: null,
        isChecked: false,
      });
      setErrors({});
      setSuccessMessage("Votre demande a été traitée avec succès. Nous vous tiendrons informés de l'avancement de votre dossier et vous contacterons prochainement.");

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle specific errors, if needed
      setErrors({ submit: 'Failed to submit form' });
    }
  };

  return (
    <Container>
      <h2>Candidature</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          {step === 1 && (
            <Step1 
              formData={formData} 
              handleChange={handleChange} 
              handleNext={handleNext}
              villes={villes}
            />
          )}
          {step === 2 && (
            <Step2 
              formData={formData} 
              handleChange={handleChange} 
              handlePrevious={handlePrevious} 
              handleNext={handleNext}
              villes={villes}
            />
          )}
          {step === 3 && (
            <Step3 
              formData={formData} 
              handleChange={handleChange} 
              handlePrevious={handlePrevious} 
              handleSubmit={handleSubmit}
              periodes={periodes}
            />
          )}
        </Col>
      </Row>
      {/* Success message */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {/* Error message */}
      {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
    </Container>
  );
}

export default MultiStepForm;
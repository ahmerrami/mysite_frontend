import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const API_URL = 'https://errami.pythonanywhere.com/api/stages';
const INITIAL_FORM_DATA = {
  civilite: '',
  nom: '',
  prenom: '',
  cin: '',
  dateN: '',
  tel: '',
  email: '',
  adress: '',
  ville: 0,
  niveau: '',
  ecole: '',
  specialite: '',
  villeEcole: 0,
  selectedPeriode: 0,
  cv: null,
  lettre: null,
  isChecked: false,
};

function MultiStepForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [step, setStep] = useState(1);
  const [villes, setVilles] = useState([]);
  const [periodes, setPeriodes] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchData('villes', setVilles);
    fetchData('periodes', setPeriodes);
  }, []);

  const fetchData = async (endpoint, setData) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}/`);
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  const handleChange = (event) => {
    const { name, type, value, checked, files } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));

    try {
      const response = await fetch(`${API_URL}/form-stage/create/`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to submit form');

      resetForm();
      setSuccessMessage("Votre demande a été traitée avec succès. Nous vous tiendrons informés de l'avancement de votre dossier et vous contacterons prochainement.");

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Les données du formulaire n\'ont pas pu être enregistrées' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  return (
    <Container>
      <h2>Candidature</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          {step === 1 && <Step1 formData={formData} handleChange={handleChange} handleNext={handleNext} villes={villes} />}
          {step === 2 && <Step2 formData={formData} handleChange={handleChange} handlePrevious={handlePrevious} handleNext={handleNext} villes={villes} />}
          {step === 3 && <Step3 formData={formData} handleChange={handleChange} handlePrevious={handlePrevious} handleSubmit={handleSubmit} loading={loading} periodes={periodes} />}
        </Col>
      </Row>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
      {loading && <Alert variant="info">Envoi des données en cours ...</Alert>}
    </Container>
  );
}

export default MultiStepForm;
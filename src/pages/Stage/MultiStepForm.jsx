import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

/*   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }; */
/*   const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }; */

  /* const handleChange = (event) => {
    const { name, type } = event.target;

    if (type === 'file') {
      const file = event.target.files[0];
      setFormData({ ...formData, [name]: file });
    } else {
      const value = event.target.value;
      setFormData({ ...formData, [name]: value });
    }
  }; */

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
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
    </Container>
  );
}

export default MultiStepForm;
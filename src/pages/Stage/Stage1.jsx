import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, FormGroup, FormLabel, FormControl, Button, Alert } from 'react-bootstrap';
import styles from './Stage.module.css';

const StageForm = () => {
  const [villes, setVilles] = useState([]);
  const [periodes, setPeriodes] = useState([]);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
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
    <div className={styles.txt}>
      <h2>Demande de stage / Formulaire d'inscription</h2>
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
    <Row>
      <Col md={6}>
        <FormGroup>
          <FormLabel htmlFor="civilite">Civilité:</FormLabel>
          <select id="civilite" name="civilite" value={formData.civilite} onChange={handleInputChange} required>
            <option value="">-- Civilité --</option>
            <option value="M">M.</option>
            <option value="Mlle">Mlle</option>
            <option value="Mme">Mme</option>
          </select>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormControl type="text" id="nom" placeholder="Entrez votre nom" name="nom" value={formData.nom} onChange={handleInputChange} required/></FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormControl type="text" name="prenom" placeholder="Entrez votre prénom" value={formData.prenom} onChange={handleInputChange} required/></FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormControl type="text" name="cin" placeholder="Entrez votre numéro CIN" value={formData.cin} onChange={handleInputChange} required/></FormGroup>
      </Col>
      <Col md={6}>     
        <FormGroup><FormLabel htmlFor="dateN">Date de naissance:</FormLabel>
          <FormControl type="date" id="dateN" name="dateN" value={formData.dateN} onChange={handleInputChange} required/>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormControl type="text" placeholder="Entrez votre numéro de téléphone" name="tel" autoComplete="tel" value={formData.tel} onChange={handleInputChange} required/></FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormControl type="email" placeholder="Entrez votre email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} required/></FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormControl type="textarea" placeholder="Entrez votre adresse" name="adress" value={formData.adress} onChange={handleInputChange} required/></FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormLabel htmlFor="ville">Ville:</FormLabel>
          <select id="ville" name="ville" value={formData.ville} onChange={handleInputChange} required>
                <option value="">Select...</option>
                {villes.map(ville => (
                    <option key={ville.id} value={ville.id}>
                        {ville.ville}
                    </option>
                ))}
          </select>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormControl type="text" placeholder="Entrez votre niveau d'études" name="niveau" value={formData.niveau} onChange={handleInputChange} required/></FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormControl type="text" placeholder="Entrez votre école" name="ecole" value={formData.ecole} onChange={handleInputChange} required/></FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormControl type="text" placeholder="Entrez votre spécialité" name="specialite" value={formData.specialite} onChange={handleInputChange} required/></FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormLabel htmlFor="villeEcole">Ville Ecole:</FormLabel>
          <select id="villeEcole" name="villeEcole" value={formData.villeEcole} onChange={handleInputChange} required>
                <option value="">Select...</option>
                {villes.map(ville => (
                    <option key={ville.id} value={ville.id}>
                        {ville.ville}
                    </option>
                ))}
          </select>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup><FormLabel htmlFor="selectedPeriode">Période:</FormLabel>
          <select id="selectedPeriode" name="selectedPeriode" value={formData.selectedPeriode} onChange={handleInputChange} required>
              <option value="">Select...</option>
              {periodes.map(periode => (
                  <option key={periode.id} value={periode.id}>
                      {periode.periode}
                  </option>
              ))}
          </select>
        </FormGroup> 
        </Col>

      {/* Other input fields */}
      <Col md={12}>
        <FormGroup><FormLabel htmlFor="cv">CV:</FormLabel>
          <input type="file" id="cv" name="cv" onChange={handleFileChange} required/>
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup><FormLabel htmlFor="lettre">Lettre de motivation:</FormLabel>
          <input type="file" id="lettre" name="lettre" onChange={handleFileChange} required/>
        </FormGroup>
      </Col>
      <Col md={12}>
        <Form.Check>
          <input type="checkbox" id="conditions" value={formData.isChecked} onChange={handleInputChange}/>
          <label htmlFor="conditions"> J'accepte </label>
          <Link to="/conditions"> les termes et conditions</Link>
        </Form.Check>
      </Col>
      
    </Row>
      {/* Success message */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {/* Error message */}
      {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
      <Button type="submit">Soumettre</Button>
    </Form>
    </div>
  );
};

export default StageForm;
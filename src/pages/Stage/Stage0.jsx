import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap'; 
import styles from './Stage.module.css';

const Stage = () => {
  const [villes, setVilles] = useState([]);
  const [periodes, setPeriodes] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
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
    selectedPeriode : 0
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024 * 1) { // 1MB
        setError('Fichier trop volumineux');
      } else if (!['application/pdf'].includes(selectedFile.type)) {
        setError('Seuls les fichiers PDF sont autorisés');
      } else {
        setFiles([...files, selectedFile]);
        setError(null);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append('cv', files[0]);
    formData.append('lettre', files[1]);
    try {
      const response = await axios.post('https://errami.pythonanywhere.com/api/stages/form-stage/create/', formData);
      console.log(response.data); // Handle response if needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.txt}>
      <h2>Demande de stage / Formulaire d'inscription</h2>
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <FormGroup>
      <FormLabel htmlFor="civilite">Civilité:</FormLabel>
        <select id="civilite" name="civilite" value={formData.civilite} onChange={handleChange}>
          <option value="">-- Civilité --</option>
          <option value="M">M.</option>
          <option value="Mlle">Mlle</option>
          <option value="Mme">Mme</option>
        </select>
      </FormGroup>
      <FormGroup><FormControl type="text" id="nom" placeholder="Entrez votre nom" name="nom" value={formData.nom} onChange={handleChange} /></FormGroup>
      <FormGroup><FormControl type="text" name="prenom" placeholder="Entrez votre prénom" value={formData.prenom} onChange={handleChange} /></FormGroup>
      <FormGroup><FormControl type="text" name="cin" placeholder="Entrez votre numéro CIN" value={formData.cin} onChange={handleChange} /></FormGroup>
      
      <FormGroup><FormLabel htmlFor="dateN">Date de naissance:</FormLabel>
        <FormControl type="date" id="dateN" name="dateN" value={formData.dateN} onChange={handleChange}/>
      </FormGroup>
      <FormGroup><FormControl type="text" placeholder="Entrez votre numéro de téléphone" name="tel" autoComplete="tel" value={formData.tel} onChange={handleChange} /></FormGroup>
      <FormGroup><FormControl type="email" placeholder="Entrez votre email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} /></FormGroup>
      <FormGroup><FormControl type="textarea" placeholder="Entrez votre adresse" name="adress" value={formData.adress} onChange={handleChange} /></FormGroup>
      
      <FormGroup><FormLabel htmlFor="ville">Ville:</FormLabel>
      <select id="ville" name="ville" value={formData.ville} onChange={handleChange}>
            <option value="">Select...</option>
            {villes.map(ville => (
                <option key={ville.id} value={ville.id}>
                    {ville.ville}
                </option>
            ))}
      </select>
    </FormGroup>
      <FormGroup><FormControl type="text" placeholder="Entrez votre nveau d'études" name="niveau" value={formData.niveau} onChange={handleChange} /></FormGroup>
      <FormGroup><FormControl type="text" placeholder="Entrez votre école" name="ecole" value={formData.ecole} onChange={handleChange} /></FormGroup>

      <FormGroup><FormControl type="text" placeholder="Entrez votre spécialité" name="specialite" value={formData.specialite} onChange={handleChange} /></FormGroup>
      <FormGroup><FormLabel htmlFor="villeEcole">Ville Ecole:</FormLabel>
      <select id="villeEcole" name="villeEcole" value={formData.villeEcole} onChange={handleChange}>
            <option value="">Select...</option>
            {villes.map(ville => (
                <option key={ville.id} value={ville.id}>
                    {ville.ville}
                </option>
            ))}
      </select>
      </FormGroup>
      <FormGroup><FormLabel htmlFor="selectedPeriode">Période:</FormLabel>
        <select id="selectedPeriode" name="selectedPeriode" value={formData.selectedPeriode} onChange={handleChange}>
            <option value="">Select...</option>
            {periodes.map(periode => (
                <option key={periode.id} value={periode.id}>
                    {periode.periode}
                </option>
            ))}
        </select>
      </FormGroup>
      <FormGroup>  
        <label htmlFor="cv">CV (PDF, max 1MB):</label>
        <input type="file" id="cv" name="cv" onChange={handleFileChange} />
      </FormGroup>
      <FormGroup>  
        <label htmlFor="lettre">Lettre(PDF, max 1MB):</label>
        <input type="file" id="lettre" name="lettre" onChange={handleFileChange} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
    </div>
  );
};

export default Stage;
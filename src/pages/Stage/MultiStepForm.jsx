import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import styles from './MultiStepForm.module.css';

const API_URL = 'https://idara.supratourstravel.com/api/stages';
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.civilite) newErrors.civilite = 'Veuillez sélectionner votre civilité';
      if (!formData.nom) newErrors.nom = 'Le nom est requis';
      if (!formData.prenom) newErrors.prenom = 'Le prénom est requis';
      if (!formData.cin) newErrors.cin = 'Le CIN est requis';
      if (!formData.dateN) newErrors.dateN = 'La date de naissance est requise';
      if (!formData.tel) newErrors.tel = 'Le téléphone est requis';
      if (!formData.email) newErrors.email = 'L\'email est requis';
      if (!formData.adress) newErrors.adress = 'L\'adresse est requise';
      if (!formData.ville) newErrors.ville = 'Veuillez sélectionner une ville';
    }
    
    if (currentStep === 2) {
      if (!formData.niveau) newErrors.niveau = 'Le niveau d\'étude est requis';
      if (!formData.ecole) newErrors.ecole = 'Le nom de l\'école est requis';
      if (!formData.specialite) newErrors.specialite = 'La spécialité est requise';
      if (!formData.villeEcole) newErrors.villeEcole = 'Veuillez sélectionner la ville de l\'école';
    }
    
    if (currentStep === 3) {
      if (!formData.selectedPeriode) newErrors.selectedPeriode = 'Veuillez sélectionner une période';
      if (!formData.cv) newErrors.cv = 'Le CV est requis';
      if (!formData.lettre) newErrors.lettre = 'La lettre de motivation est requise';
      if (!formData.isChecked) newErrors.isChecked = 'Veuillez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      const submitFormData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          submitFormData.append(key, formData[key]);
        }
      });

      const response = await fetch(`${API_URL}/`, {
        method: 'POST',
        body: submitFormData,
      });

      if (!response.ok) throw new Error('Erreur lors de la soumission');

      setSuccessMessage('Votre candidature a été envoyée avec succès !');
      resetForm();
      setStep(1);
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: 'Erreur lors de l\'envoi. Veuillez réessayer.' }));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSuccessMessage('');
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return 'Informations Personnelles';
      case 2: return 'Formation Académique';
      case 3: return 'Candidature & Documents';
      default: return 'Candidature';
    }
  };

  const getStepDescription = () => {
    switch(step) {
      case 1: return 'Renseignez vos informations personnelles et de contact';
      case 2: return 'Indiquez votre parcours académique et votre spécialité';
      case 3: return 'Choisissez votre période de stage et joignez vos documents';
      default: return '';
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* En-tête du formulaire */}
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Candidature de Stage</h1>
        <p className={styles.formSubtitle}>
          Rejoignez l'équipe Supratours Travel pour une expérience professionnelle enrichissante
        </p>
        
        {/* Indicateur de progression */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <div className={styles.stepIndicators}>
            {[1, 2, 3].map(stepNum => (
              <div 
                key={stepNum}
                className={`${styles.stepIndicator} ${
                  stepNum <= step ? styles.active : ''
                } ${stepNum < step ? styles.completed : ''}`}
              >
                <span className={styles.stepNumber}>
                  {stepNum < step ? '✓' : stepNum}
                </span>
                <span className={styles.stepLabel}>
                  {stepNum === 1 ? 'Personnel' : stepNum === 2 ? 'Formation' : 'Documents'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corps du formulaire */}
      <div className={styles.formBody}>
        <div className={styles.stepHeader}>
          <h2 className={styles.stepTitle}>{getStepTitle()}</h2>
          <p className={styles.stepDescription}>{getStepDescription()}</p>
        </div>

        <div className={styles.stepContent}>
          {step === 1 && (
            <Step1 
              formData={formData} 
              handleChange={handleChange} 
              handleNext={handleNext} 
              villes={villes}
              errors={errors}
            />
          )}
          {step === 2 && (
            <Step2 
              formData={formData} 
              handleChange={handleChange} 
              handlePrevious={handlePrevious} 
              handleNext={handleNext} 
              villes={villes}
              errors={errors}
            />
          )}
          {step === 3 && (
            <Step3 
              formData={formData} 
              handleChange={handleChange} 
              handlePrevious={handlePrevious} 
              handleSubmit={handleSubmit} 
              loading={loading} 
              periodes={periodes}
              errors={errors}
            />
          )}
        </div>
      </div>

      {/* Messages d'état */}
      {successMessage && (
        <div className={styles.successMessage}>
          <div className={styles.messageIcon}>🎉</div>
          <div>
            <h3>Félicitations !</h3>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {errors.submit && (
        <div className={styles.errorMessage}>
          <div className={styles.messageIcon}>⚠️</div>
          <div>
            <h3>Erreur</h3>
            <p>{errors.submit}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
            <p>Envoi de votre candidature en cours...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiStepForm;
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
  telConfirm: '',
  email: '',
  emailConfirm: '',
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    fetchData('villes', setVilles);
    fetchData('periodes', setPeriodes);
  }, []);

  const fetchData = async (endpoint, setData) => {
    try {
      console.log(`🔍 Récupération ${endpoint}...`);
      const response = await fetch(`${API_URL}/${endpoint}/`);
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await response.json();
      console.log(`✅ ${endpoint} récupérées:`, data);
      setData(data);
    } catch (error) {
      console.error(`❌ Error fetching ${endpoint}:`, error);
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
      if (!formData.dateN) {
        newErrors.dateN = 'La date de naissance est requise';
      } else {
        // Validation de l'âge (entre 18 et 35 ans)
        const today = new Date();
        const birthDate = new Date(formData.dateN);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        
        let actualAge = age;
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          actualAge = age - 1;
        }
        
        if (actualAge < 18) {
          newErrors.dateN = 'Vous devez avoir au moins 18 ans pour postuler';
        } else if (actualAge > 35) {
          newErrors.dateN = 'Vous devez avoir 35 ans maximum pour postuler';
        }
      }
      if (!formData.tel) {
        newErrors.tel = 'Le téléphone est requis';
      } else {
        // Validation format téléphone : 10 chiffres commençant par 0
        const phoneRegex = /^0[0-9]{9}$/;
        if (!phoneRegex.test(formData.tel)) {
          newErrors.tel = 'Le téléphone doit contenir 10 chiffres et commencer par 0 (ex: 0612345678)';
        }
      }
      if (!formData.telConfirm) {
        newErrors.telConfirm = 'La confirmation du téléphone est requise';
      } else if (formData.tel && formData.telConfirm && formData.tel !== formData.telConfirm) {
        newErrors.telConfirm = 'Les numéros de téléphone ne correspondent pas';
      }
      if (!formData.email) newErrors.email = 'L\'email est requis';
      if (!formData.emailConfirm) newErrors.emailConfirm = 'La confirmation d\'email est requise';
      if (formData.email && formData.emailConfirm && formData.email !== formData.emailConfirm) {
        newErrors.emailConfirm = 'Les adresses email ne correspondent pas';
      }
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
    console.log('🚀 Début de la soumission...');
    console.log('📋 Données du formulaire:', formData);
    
    if (!validateStep(3)) {
      console.log('❌ Échec de la validation de l\'étape 3');
      console.log('🔍 Erreurs de validation:', errors);
      return;
    }

    console.log('✅ Validation réussie, envoi en cours...');
    setLoading(true);
    
    try {
      const submitFormData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          console.log(`📎 Ajout ${key}:`, formData[key]);
          submitFormData.append(key, formData[key]);
        }
      });

      // Envoi vers l'API
      console.log('📡 Envoi vers l\'API...');
      
      const response = await fetch(`${API_URL}/form-stage/create/`, {
        method: 'POST',
        body: submitFormData,
      });

      console.log(`📊 Réponse API: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        
        // Traiter les erreurs spécifiques
        if (errorData.cv && errorData.cv.includes('No file was submitted')) {
          setErrors(prev => ({ ...prev, cv: 'Le CV est obligatoire' }));
        }
        if (errorData.lettre && errorData.lettre.includes('No file was submitted')) {
          setErrors(prev => ({ ...prev, lettre: 'La lettre de motivation est obligatoire' }));
        }
        
        throw new Error(`Erreur ${response.status}: ${JSON.stringify(errorData)}`);
      }

      const responseData = await response.json();
      console.log('✅ Succès API:', responseData);
      
      // Afficher le modal de succès
      setShowSuccessModal(true);
    } catch (error) {
      console.error('💥 Erreur lors de l\'envoi:', error);
      setErrors(prev => ({ ...prev, submit: `Erreur lors de l'envoi: ${error.message}` }));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSuccessMessage('');
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    resetForm();
    setStep(1);
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
        
        {/* Titre promotionnel animé */}
        <div className={styles.promotionalTitle}>
          Stage rémunéré assuré pendant la CAN 2025
        </div>
        
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

      {/* Modal de succès */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.successModal}>
            <div className={styles.modalIcon}>🎉</div>
            <h2 className={styles.modalTitle}>Félicitations !</h2>
            <p className={styles.modalMessage}>
              Votre candidature a été envoyée avec succès !<br />
              Nous vous contacterons bientôt.
            </p>
            <button 
              className={`${styles.btn} ${styles.btnPrimary} ${styles.modalButton}`}
              onClick={handleSuccessModalClose}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Messages d'état */}
      {successMessage && (
        <div className={styles.successMessage}>
          <div className={styles.messageIcon}>🎉</div>
          <div>
            <h3>Félicitations !</h3>
            <p>{successMessage}</p>
          </div>
          <button 
            className={styles.closeButton}
            onClick={() => setSuccessMessage('')}
            aria-label="Fermer le message"
          >
            ×
          </button>
        </div>
      )}

      {errors.submit && (
        <div className={styles.errorMessage}>
          <div className={styles.messageIcon}>⚠️</div>
          <div>
            <h3>Erreur</h3>
            <p>{errors.submit}</p>
          </div>
          <button 
            className={styles.closeButton}
            onClick={() => setErrors(prev => ({ ...prev, submit: '' }))}
            aria-label="Fermer le message"
          >
            ×
          </button>
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
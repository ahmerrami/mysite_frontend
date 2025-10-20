import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MultiStepForm.module.css';

function Step3({ formData, handleChange, handlePrevious, handleSubmit, loading, periodes, errors }) {
  const { selectedPeriode, cv, lettre, isChecked } = formData;
  const [cvError, setCvError] = useState('');
  const [lettreError, setLettreError] = useState('');

  const validateStep = () => {
    console.log('🔍 Debug validation Step3:');
    console.log('  selectedPeriode:', selectedPeriode);
    console.log('  cv:', cv);
    console.log('  lettre:', lettre);
    console.log('  isChecked:', isChecked);
    console.log('  cvError:', cvError);
    console.log('  lettreError:', lettreError);
    
    // Validation simplifiée : on ignore les erreurs locales et on se fie aux données du formulaire
    const isValid = selectedPeriode && cv && lettre && isChecked;
    console.log('  🎯 Validation result:', isValid);
    
    return isValid;
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

      handleChange(e);
    }
  };

  return (
    <div className={styles.stepContainer}>
      {/* Message d'aide pour la completion du formulaire */}
      <div className={`${styles.helperMessage} ${validateStep() ? styles.hidden : ''}`}>
        Veuillez renseigner tous les champs requis pour pouvoir soumettre votre candidature.
      </div>
      <div className={styles.formGrid}>
        {/* Période de stage */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} ${styles.required}`}>
            Période de stage souhaitée
          </label>
          <select
            name="selectedPeriode"
            value={selectedPeriode}
            onChange={handleChange}
            className={styles.formSelect}
            required
          >
            <option value="">Choisissez votre période préférée</option>
            {periodes.map((periode) => (
              <option key={periode.id} value={periode.id}>
                {periode.periode}
              </option>
            ))}
          </select>
          {errors.selectedPeriode && <div className={styles.formError}>{errors.selectedPeriode}</div>}
        </div>

        {/* Documents à télécharger */}
        <div className={styles.documentsSection}>
          <h3 className={styles.sectionSubtitle}>Documents requis</h3>
          
          {/* CV */}
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Curriculum Vitae (CV)
            </label>
            <div className={`${styles.fileUpload} ${cv ? styles.fileSelected : ''}`}>
              <input
                type="file"
                name="cv"
                onChange={handleFileChange}
                accept=".pdf"
                required
              />
              <div className={styles.fileUploadLabel}>
                <span className={styles.fileIcon}>📄</span>
                <div>
                  <strong>{cv ? cv.name : 'Sélectionner votre CV'}</strong>
                  <p>Format PDF uniquement - Max 1 Mo</p>
                </div>
              </div>
            </div>
            {cvError && <div className={styles.formError}>{cvError}</div>}
            {errors.cv && <div className={styles.formError}>{errors.cv}</div>}
          </div>

          {/* Lettre de motivation */}
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Lettre de Motivation
            </label>
            <div className={`${styles.fileUpload} ${lettre ? styles.fileSelected : ''}`}>
              <input
                type="file"
                name="lettre"
                onChange={handleFileChange}
                accept=".pdf"
                required
              />
              <div className={styles.fileUploadLabel}>
                <span className={styles.fileIcon}>📝</span>
                <div>
                  <strong>{lettre ? lettre.name : 'Sélectionner votre lettre'}</strong>
                  <p>Format PDF uniquement - Max 1 Mo</p>
                </div>
              </div>
            </div>
            {lettreError && <div className={styles.formError}>{lettreError}</div>}
            {errors.lettre && <div className={styles.formError}>{errors.lettre}</div>}
          </div>
        </div>

        {/* Conditions d'utilisation */}
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="conditions"
            name="isChecked"
            checked={isChecked}
            onChange={handleChange}
            required
            style={{
              width: '20px',
              height: '20px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          />
          <label htmlFor="conditions" className={styles.checkboxText} style={{cursor: 'pointer'}}>
            J'accepte{' '}
            <Link to="/conditions" className={styles.conditionsLink}>
              les termes et conditions
            </Link>{' '}
            de candidature et certifie que les informations fournies sont exactes.
          </label>
        </div>
        {errors.isChecked && <div className={styles.formError}>{errors.isChecked}</div>}

        {/* Informations sur le processus */}
        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>📋</div>
          <div className={styles.infoContent}>
            <h4>Prochaines étapes</h4>
            <ul>
              <li>Votre candidature sera examinée sous 48h</li>
              <li>Vous recevrez un email de confirmation</li>
              <li>Un entretien peut être organisé si votre profil correspond</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Affichage de l'erreur d'envoi */}
      {errors.submit && (
        <div className={styles.formError} style={{textAlign: 'center', marginTop: '20px', fontSize: '1.1rem'}}>
          {errors.submit}
        </div>
      )}

      {/* Boutons de navigation */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={handlePrevious}
          className={`${styles.btn} ${styles.btnSecondary}`}
          disabled={loading}
        >
          <span>←</span>
          Précédent
        </button>
        
        <button
          type="button"
          onClick={() => {
            console.log('🖱️ Bouton cliqué !');
            console.log('🔍 État actuel:', { selectedPeriode, cv, lettre, isChecked });
            handleSubmit();
          }}
          disabled={!validateStep() || loading}
          className={`${styles.btn} ${styles.btnSuccess}`}
        >
          {loading ? (
            <>
              <div className={styles.miniSpinner}></div>
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyer ma candidature
              <span>✉️</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Step3;
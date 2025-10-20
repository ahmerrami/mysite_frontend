import React from 'react';
import styles from './MultiStepForm.module.css';

function Step2({ formData, handleChange, handlePrevious, handleNext, villes, errors }) {
  const { niveau, ecole, specialite, villeEcole } = formData;

  const validateStep = () => {
    return niveau && ecole && specialite && villeEcole;
  };

  return (
    <div className={styles.stepContainer}>
      {/* Message d'aide pour la completion du formulaire */}
      <div className={`${styles.helperMessage} ${validateStep() ? styles.hidden : ''}`}>
        Veuillez renseigner tous les champs requis pour pouvoir passer à l'étape suivante.
      </div>
      
      <div className={styles.formGrid}>
        {/* Niveau d'étude */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} ${styles.required}`}>
            Niveau d'étude actuel
          </label>
          <select
            name="niveau"
            value={niveau}
            onChange={handleChange}
            className={styles.formSelect}
            required
          >
            <option value="">Sélectionnez votre niveau</option>
            <option value="Bac">Baccalauréat</option>
            <option value="Bac+1">Bac+1</option>
            <option value="Bac+2">Bac+2 (DUT, BTS)</option>
            <option value="Bac+3">Bac+3 (Licence)</option>
            <option value="Bac+4">Bac+4</option>
            <option value="Bac+5">Bac+5 (Master)</option>
            <option value="Bac+6">Bac+6</option>
            <option value="Doctorat">Doctorat</option>
            <option value="Autre">Autre</option>
          </select>
          {errors.niveau && <div className={styles.formError}>{errors.niveau}</div>}
        </div>

        {/* École et Spécialité */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Établissement / École
            </label>
            <input
              type="text"
              name="ecole"
              value={ecole}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Nom de votre établissement"
              required
            />
            {errors.ecole && <div className={styles.formError}>{errors.ecole}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Spécialité / Filière
            </label>
            <input
              type="text"
              name="specialite"
              value={specialite}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Ex: Informatique, Commerce, etc."
              required
            />
            {errors.specialite && <div className={styles.formError}>{errors.specialite}</div>}
          </div>
        </div>

        {/* Ville de l'école */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} ${styles.required}`}>
            Ville de l'établissement
          </label>
          <select
            name="villeEcole"
            value={villeEcole}
            onChange={handleChange}
            className={styles.formSelect}
            required
          >
            <option value="">Sélectionnez la ville de votre école</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.id}>
                {ville.nom || ville.ville}
              </option>
            ))}
          </select>
          {errors.villeEcole && <div className={styles.formError}>{errors.villeEcole}</div>}
        </div>

        {/* Informations supplémentaires */}
        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>🎓</div>
          <div className={styles.infoContent}>
            <h4>Pourquoi ces informations ?</h4>
            <p>
              Ces détails nous aident à mieux comprendre votre profil académique et à adapter 
              votre stage en fonction de vos compétences et objectifs d'apprentissage.
            </p>
          </div>
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={handlePrevious}
          className={`${styles.btn} ${styles.btnSecondary}`}
        >
          <span>←</span>
          Précédent
        </button>
        
        <button
          type="button"
          onClick={handleNext}
          disabled={!validateStep()}
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          Continuer
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default Step2;
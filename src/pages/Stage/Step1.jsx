import React from 'react';
import styles from './MultiStepForm.module.css';

function Step1({ formData, handleChange, handleNext, villes, errors }) {
  const { civilite, nom, prenom, cin, dateN, tel, email, adress, ville } = formData;

  const validateStep = () => {
    return civilite && nom && prenom && cin && dateN && tel && email && adress && ville;
  };

  return (
    <div className={styles.stepContainer}>
      <div className={styles.formGrid}>
        {/* Civilité */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} ${styles.required}`}>
            Civilité
          </label>
          <select
            name="civilite"
            value={civilite}
            onChange={handleChange}
            className={styles.formSelect}
            required
          >
            <option value="">Sélectionnez votre civilité</option>
            <option value="M.">Monsieur</option>
            <option value="Mlle">Mademoiselle</option>
            <option value="Mme">Madame</option>
          </select>
          {errors.civilite && <div className={styles.formError}>{errors.civilite}</div>}
        </div>

        {/* Nom et Prénom */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Nom de famille
            </label>
            <input
              type="text"
              name="nom"
              value={nom}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Votre nom"
              required
            />
            {errors.nom && <div className={styles.formError}>{errors.nom}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Prénom
            </label>
            <input
              type="text"
              name="prenom"
              value={prenom}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Votre prénom"
              required
            />
            {errors.prenom && <div className={styles.formError}>{errors.prenom}</div>}
          </div>
        </div>

        {/* CIN et Date de naissance */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Numéro CIN
            </label>
            <input
              type="text"
              name="cin"
              value={cin}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Ex: AB123456"
              required
            />
            {errors.cin && <div className={styles.formError}>{errors.cin}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Date de naissance
            </label>
            <input
              type="date"
              name="dateN"
              value={dateN}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
            {errors.dateN && <div className={styles.formError}>{errors.dateN}</div>}
          </div>
        </div>

        {/* Téléphone et Email */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Téléphone
            </label>
            <input
              type="tel"
              name="tel"
              value={tel}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="06 XX XX XX XX"
              required
            />
            {errors.tel && <div className={styles.formError}>{errors.tel}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="votre.email@exemple.com"
              required
            />
            {errors.email && <div className={styles.formError}>{errors.email}</div>}
          </div>
        </div>

        {/* Adresse */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} ${styles.required}`}>
            Adresse complète
          </label>
          <textarea
            name="adress"
            value={adress}
            onChange={handleChange}
            className={styles.formTextarea}
            placeholder="Votre adresse complète (rue, quartier, ville)"
            rows="3"
            required
          />
          {errors.adress && <div className={styles.formError}>{errors.adress}</div>}
        </div>

        {/* Ville */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} ${styles.required}`}>
            Ville de résidence
          </label>
          <select
            name="ville"
            value={ville}
            onChange={handleChange}
            className={styles.formSelect}
            required
          >
            <option value="">Sélectionnez votre ville</option>
            {villes.map((v) => (
              <option key={v.id} value={v.id}>
                {v.nom}
              </option>
            ))}
          </select>
          {errors.ville && <div className={styles.formError}>{errors.ville}</div>}
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className={styles.buttonGroup}>
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

export default Step1;
import React from 'react';
import PhoneIcon from '../Icon/PhoneIcon';
import MailIcon from '../Icon/MailIcon';
import styles from './Contact.module.css';

const Contact = ({ imageUrl, name, position, address, email, phone, type }) => {
  const isPerson = type === 'person';
  const isAgency = type === 'agency';

  return (
    <div className={`${styles.contactCard} ${isPerson ? styles.personCard : styles.agencyCard}`}>
      <div className={styles.cardHeader}>
        <div className={styles.imageContainer}>
          <img 
            src={imageUrl} 
            alt={name}
            className={`${styles.contactImage} ${isPerson ? styles.personImage : styles.agencyImage}`}
          />
          {isPerson && <div className={styles.onlineIndicator}></div>}
        </div>
        <div className={styles.contactInfo}>
          <h3 className={styles.contactName}>{name}</h3>
          <p className={styles.contactPosition}>{position}</p>
          {address && <p className={styles.contactAddress}>{address}</p>}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.contactDetails}>
          {email && (
            <div className={styles.contactItem}>
              <MailIcon />
              <a href={`mailto:${email}`} className={styles.contactLink}>
                {email}
              </a>
            </div>
          )}
          {phone && (
            <div className={styles.contactItem}>
              <PhoneIcon />
              <a href={`tel:${phone}`} className={styles.contactLink}>
                {phone}
              </a>
            </div>
          )}
        </div>

        {isPerson && (
          <div className={styles.actionButtons}>
            <button className={styles.primaryButton}>
              💬 Contacter
            </button>
          </div>
        )}

        {isAgency && (
          <div className={styles.agencyFeatures}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎫</span>
              <span>Billetterie</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>ℹ️</span>
              <span>Informations</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎒</span>
              <span>Voyages</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
import React from 'react';
import Contact from './Contact';
import styles from './ContactsList.module.css';

const contactsData = [
  { 
    id: 1, 
    name: 'Adam BOUDARA', 
    imageUrl:'./unknown.png', 
    position: 'Responsable BU Tourisme', 
    email: 'a.boudara@supratourstravel.com', 
    phone:'0702-066281',
    type: 'person'
  },
  { 
    id: 2, 
    name: 'Tarik EL AOUFIR', 
    imageUrl:'./unknown.png', 
    position: 'Responsable Commercial Tourisme', 
    email: 't.elaoufir@supratourstravel.com', 
    phone:'0661-573767',
    type: 'person'
  },
  { 
    id: 3, 
    name: 'Service RH', 
    imageUrl:'./unknown.png', 
    position: 'Responsable Stages & Ressources Humaines', 
    email: 'stages.st@hotmail.com', 
    phone:'0702-008774',
    type: 'person'
  },
  { 
    id: 4, 
    name: 'Abdelmajid KASMI', 
    imageUrl:'./unknown.png', 
    position: 'Responsable Parkings', 
    email: 'a.kasmi@supratourstravel.com', 
    phone:'0702-028777',
    type: 'person'
  },    
  { 
    id: 5, 
    name: 'Agence de Rabat', 
    imageUrl:'./logo.png', 
    position: 'Local A5, Gare Rabat Agdal', 
    address: 'Rue Abderrahmane El Ghafiki',
    email: 'contact@supratourstravel.com', 
    phone:'0537-776509',
    type: 'agency'
  },
  { 
    id: 6, 
    name: 'Agence de Tanger', 
    imageUrl:'./logo.png', 
    position: 'Local T13, Gare Tanger Ville', 
    address: 'Boulevard d\'Espagne MALABATA',
    email: 'contact@supratourstravel.com', 
    phone:'0539-336550',
    type: 'agency'
  },
];

const ContactsList = () => {
  const personContacts = contactsData.filter(contact => contact.type === 'person');
  const agencyContacts = contactsData.filter(contact => contact.type === 'agency');

  return (
    <div className={styles.contactsContainer}>
      {/* Section Hero */}
      <div className={styles.heroSection}>
        <h1 className={styles.mainTitle}>Contactez-nous</h1>
        <p className={styles.heroSubtitle}>
          Notre équipe d'experts est à votre disposition pour répondre à tous vos besoins de voyage
        </p>
        <div className={styles.heroHighlight}>
          <div className={styles.highlightItem}>
            <span className={styles.highlightIcon}>📞</span>
            <span>Support 7j/7</span>
          </div>
          <div className={styles.highlightItem}>
            <span className={styles.highlightIcon}>✈️</span>
            <span>Devis personnalisé</span>
          </div>
          <div className={styles.highlightItem}>
            <span className={styles.highlightIcon}>🎯</span>
            <span>Expertise confirmée</span>
          </div>
        </div>
      </div>

      {/* Section Équipe */}
      <div className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Notre Équipe</h2>
        <p className={styles.sectionSubtitle}>
          Des professionnels dédiés pour vous accompagner dans tous vos projets
        </p>
        <div className={styles.contactsGrid}>
          {personContacts.map((contact) => (
            <Contact 
              key={contact.id}
              imageUrl={contact.imageUrl}
              name={contact.name}
              position={contact.position}
              email={contact.email}
              phone={contact.phone}
              type={contact.type}
            />
          ))}
        </div>
      </div>

      {/* Section Agences */}
      <div className={styles.agenciesSection}>
        <h2 className={styles.sectionTitle}>Nos Agences</h2>
        <p className={styles.sectionSubtitle}>
          Retrouvez-nous dans nos points de vente stratégiquement situés
        </p>
        <div className={styles.agenciesGrid}>
          {agencyContacts.map((contact) => (
            <Contact 
              key={contact.id}
              imageUrl={contact.imageUrl}
              name={contact.name}
              position={contact.position}
              address={contact.address}
              email={contact.email}
              phone={contact.phone}
              type={contact.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
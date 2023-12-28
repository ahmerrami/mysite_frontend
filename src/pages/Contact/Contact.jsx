// ContactList.jsx (functional component)
import React from 'react';
import styles from './Contact.module.css';
import MailIcon from '../Icon/MailIcon.jsx';
import PhoneIcon from '../Icon/PhoneIcon.jsx';

const ContactList = ({ contacts }) => {
  return (
    <>
      <div  className={styles.cardContainer}>
          {contacts.map((contact) => (
          <div key={contact.id} className={styles.contactCard}>
              <img className={styles.contactImg} src={contact.imageUrl} alt="Pic profile"/>
              <h4>{contact.name}</h4>
              <h6>{contact.position}</h6>
              <p><MailIcon/>{contact.email}</p>
              <p><PhoneIcon/>{contact.telephone}</p>
          </div>
          
          ))}
      </div>
    </>
  );
}

function Contact() {
  const contactList = [
    { id: 1, name: 'Adam BOUDARA', imageUrl:'./unknown.png', position: 'Responsable Tourisme', email: 'a.boudara@supratourstravel.com', telephone:'0702-066281' },
    { id: 2, name: 'Tarik EL AOUFIR', imageUrl:'./unknown.png', position: 'Responsable Hajj & Omra', email: 't.elaoufir@supratourstravel.com', telephone:'0661-573767' },
    { id: 3, name: 'Agence de Rabat', imageUrl:'./logo.png', position: 'Local A5, Gare Rabat Agdal, sis Rue Abderrahmane El Ghafiki', email: 'contact@supratourstravel.com', telephone:'0537-776509' },
    { id: 4, name: 'Agence de Tanger', imageUrl:'./logo.png', position: 'Local T13*, Gare ferroviaire de Tanger Ville, sis Boulevard d’Espagne MALABATA', email: 'contact@supratourstravel.com', telephone:'0539-336550' },
    { id: 5, name: 'Abdelmajid KASMI', imageUrl:'./unknown.png', position: 'Responsable Parkings', email: 'a.kasmi@supratourstravel.com', telephone:'0702-028777' },
    { id: 6, name: 'Youssef AFEKHAR', imageUrl:'./unknown.png', position: 'Responsable Commercial Font-Office', email: 'y.afekhar@supratourstravel.com', telephone:'0660-342385' },
    //{ id: 7, name: 'Ahmed ERRAMI', imageUrl:'./unknown.png', position: 'Responsable Financier', email: 'a.errami@supratourstravel.com', telephone:'0660-147499' },    
    // Add more contacts as needed
  ];

  return (
    <div>
      <ContactList contacts={contactList} />
    </div>
  );
}

export default Contact
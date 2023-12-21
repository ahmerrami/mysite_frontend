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
    { id: 1, name: 'Youssef AFEKHAR', imageUrl:'./unknown.png', position: 'Responsable RH et Formation', email: 'y.afekhar@supratourstravel.com', telephone:'0660-342385' },
    { id: 2, name: 'Ahmed ERRAMI', imageUrl:'./unknown.png', position: 'Responsable Financier', email: 'a.errami@supratourstravel.com', telephone:'0660-147499' },
    { id: 3, name: 'Mohammed LAHMOUZ', imageUrl:'./unknown.png', position: 'Responsable Services', email: 'm.lahmouz@supratourstravel.com', telephone:'0660-133501' },
    { id: 4, name: 'Noureddine MARJANI', imageUrl:'./unknown.png', position: 'Responsable Facility Management', email: 'n.marjani@supratourstravel.com', telephone:'0660-348453' },
    { id: 5, name: 'Adam BOUDARA', imageUrl:'./unknown.png', position: 'Responsable Tourisme', email: 'a.boudara@supratourstravel.com', telephone:'0702-066281' },
    // Add more contacts as needed
  ];

  return (
    <div>
      <ContactList contacts={contactList} />
    </div>
  );
}

export default Contact
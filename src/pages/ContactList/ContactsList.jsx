import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Contact from './Contact';

const contactsData = [
  { id: 1, 
    name: 'Adam BOUDARA', 
    imageUrl:'./unknown.png', 
    position: 'Responsable BU Tourisme', 
    email: 'a.boudara@supratourstravel.com', 
    phone:'0702-066281' },
  { id: 2, 
    name: 'Tarik EL AOUFIR', 
    imageUrl:'./unknown.png', 
    position: 'Responsable Commercial Tourisme', 
    email: 't.elaoufir@supratourstravel.com', 
    phone:'0661-573767' },
  { id: 3, 
    name: 'Youssef AFEKHAR', 
    imageUrl:'./unknown.png', 
    position: 'Responsable RH et Formation / BU Commercial Font-Office', 
    email: 'y.afekhar@supratourstravel.com', 
    phone:'0660-342385' },
  { id: 4, 
    name: 'Abdelmajid KASMI', 
    imageUrl:'./unknown.png', 
    position: 'Responsable Parkings', 
    email: 'a.kasmi@supratourstravel.com', 
    phone:'0702-028777' },    
  { id: 5, 
    name: 'Agence de Rabat', 
    imageUrl:'./logo.png', 
    position: 'Local A5, Gare Rabat Agdal, sis Rue Abderrahmane El Ghafiki', 
    email: 'contact@supratourstravel.com', 
    phone:'0537-776509' },
  { id: 6, 
    name: 'Agence de Tanger', 
    imageUrl:'./logo.png', 
    position: 'Local T13*, Gare Tanger Ville, sis Boulevard d’Espagne MALABATA', 
    email: 'contact@supratourstravel.com', 
    phone:'0539-336550' },
  // Add more contacts as needed
];

const ContactsList = () => {
  return (
    <Row>
      {contactsData.map((contact) => (
        <Col key={contact.id} md={4}>
          <Contact 
            imageUrl={contact.imageUrl}
            name={contact.name}
            position={contact.position}
            email={contact.email}
            phone={contact.phone}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ContactsList;

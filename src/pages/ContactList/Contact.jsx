import React from 'react';
import { Card } from 'react-bootstrap';
import PhoneIcon from '../Icon/PhoneIcon';
import MailIcon from '../Icon/MailIcon';

const Contact = ({ imageUrl, name, position, email, phone }) => {
  return (
    <Card 
      style={{ 
        marginBottom: '20px', 
        textAlign: 'center', 
        borderRadius: '10px', 
        boxShadow: '5px 5px 5px hsla(0, 0%, 0%, 0.112)' 
      }}
    >
      <Card.Img 
        className="mx-auto d-block" 
        variant="top" 
        src={imageUrl} 
        style={{ maxWidth: '30%', borderRadius: '50%' }} 
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{position}</Card.Subtitle>
        <Card.Text><MailIcon /> {email}</Card.Text>
        <Card.Text><PhoneIcon /> {phone}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Contact;

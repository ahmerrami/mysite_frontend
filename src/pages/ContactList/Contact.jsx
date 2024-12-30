import React from 'react';
import { Card } from 'react-bootstrap';
import PhoneIcon from '../Icon/PhoneIcon';
import MailIcon from '../Icon/MailIcon';

const Contact = ({ imageUrl, name, position, email, phone }) => {
  return (
    <Card 
      style={{ 
        //marginBottom: '20px',
        backgroundColor:'rgba(176,140,93,255)',
        color: 'white',
        textAlign: 'center', 
        borderRadius: '10px', 
        boxShadow: '5px 5px 5px hsla(0, 0%, 0%, 0.112)',

        padding: '20px',
        margin: '10px',
        maxWidth: '320px',
        minWidth: '320px',
        minHeight: '420px',
        display: 'inline-block' 
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
        <hr/>
        <Card.Subtitle >{position}</Card.Subtitle>
        <hr/>
        <Card.Text><MailIcon /> {email}</Card.Text>
        <hr/>
        <Card.Text><PhoneIcon /> {phone}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Contact;

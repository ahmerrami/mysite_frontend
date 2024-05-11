import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';

function MyForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Perform form submission logic here
  };

  return (
    <MDBContainer>
      <form onSubmit={handleSubmit}>
        <MDBInput 
          type="text" 
          label="First Name" 
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <MDBInput 
          type="text" 
          label="Last Name" 
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <MDBInput 
          type="email" 
          label="Email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <MDBInput 
          type="textarea" 
          label="Message" 
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control 
            as="select" 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>
        <MDBBtn type="submit">Submit</MDBBtn>
      </form>
    </MDBContainer>
  );
}

export default MyForm;
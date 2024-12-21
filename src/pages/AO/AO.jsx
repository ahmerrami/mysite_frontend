import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Table, Spinner, Alert } from 'react-bootstrap'; // Import Table, Spinner, and Alert components
import axios from 'axios';

import PDFDownloader from '../PDFViewer/PDFDownloader';

const AO = () => {
  const [AOs, setAOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Remplacez l'URL par l'endpoint réel de votre API Django REST
    const fetchAOs = async () => {
      try {
        const response = await axios.get('https://errami.pythonanywhere.com/api/aos/aos/');
        setAOs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données.');
        setLoading(false);
      }
    };

    fetchAOs();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  if (AOs.length === 0) {
    return <Alert variant="info">Aucun appel d'offres disponible pour le moment.</Alert>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>numéro</th>
          <th>objet</th>
          <th>date ouverture</th>
          <th>CPS</th>
        </tr>
      </thead>
      <tbody>
        {AOs.map((AO) => (
          <tr key={AO.id}>
            <td>{AO.numero}</td>
            <td>{AO.objet}</td>
            <td>{AO.date}</td>
            <td><PDFDownloader pdfUrl={AO.aopdf} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AO;
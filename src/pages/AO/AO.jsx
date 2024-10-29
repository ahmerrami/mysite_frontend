// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Table } from 'react-bootstrap'; // Import Table component from React Bootstrap

import PDFDownloader from '../PDFViewer/PDFDownloader';

const AO = () => {
  const AOs = [
    { 
      id: 1,
      numero: "08-AO-2024-ST",
      pdfUrl: '/08-AO-2024-ST.pdf', 
      objet: "Mise à disposition du personnel pour assurer la prestation d'exploitation au niveau des parkings et la prestation de services communs au niveau du siège", 
      date: '22 Novembre 2024',
    }
  ];
  
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
            <td><PDFDownloader pdfUrl={AO.pdfUrl} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AO;
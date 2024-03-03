import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Table } from 'react-bootstrap'; // Import Table component from React Bootstrap

import PDFDownloader from '../PDFViewer/PDFDownloader';

const AO = () => {
  const AOs =[
    { id: 1,
      numero:"AO01-AO-2024-ST",
      pdfUrl: '/AO01-AO-2024-ST.pdf', 
      objet:"Assistance des clients à l'utilisation des distributeurs automatique de tickets au niveau des gares ONCF", 
      date: '26 Mars 2024',
    },
    { id: 2,
      numero:'AO02-AO-2024-ST',
      pdfUrl: '/AO02-AO-2024-ST.pdf', 
      objet:"Réhabilitation du centre vacancier de Saidia", 
      date: '19 Mars 2024',
    }
  ]
  
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
        <tr>
          <td>{AO.numero}</td>
          <td>{AO.objet}</td>
          <td>{AO.date}</td>
          <td><PDFDownloader pdfUrl={AO.pdfUrl}/></td>
        </tr>
        ))}
        </tbody>
    </Table>
  );
};

export default AO;

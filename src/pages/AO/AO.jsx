import React from 'react';
import PDFViewer from '../PDFViewer/PDFViewer';
import myPDF from './AO.pdf';

const AO = () => {
  return (
    <div>
      <h1>Mon AO</h1>
      <PDFViewer pdfUrl={myPDF} />
    </div>
  );
};

export default AO;

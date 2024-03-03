import React from 'react';

const PDFDownloader = ({pdfUrl}) => {
  
  return (
    <div>
      <a href={pdfUrl} download> Télécharger le CPS </a>
    </div>
  );
}

export default PDFDownloader;
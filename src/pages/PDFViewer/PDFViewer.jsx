import React from 'react';
import { Document, Page } from '@react-pdf/renderer';

const PDFViewer = ({ pdfUrl }) => {
  return (
    <div>
      <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
      {/* <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document> */}
    </div>
  );
};

export default PDFViewer;
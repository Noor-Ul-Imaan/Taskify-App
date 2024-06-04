import React from 'react';

const PDFViewer = ({ url }) => {
  return (
    <div style={{ width: '100%', height: '800px' }}>
      <embed src={url} type="application/pdf" width="100%" height="100%" />
    </div>
  );
};

export default PDFViewer;

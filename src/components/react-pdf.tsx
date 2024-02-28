import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// This is required to resolve an issue with SSR (server-side rendering) in react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {file && (
        <div  style={{ position: 'absolute', top: 0, left: 0 }}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          {/* <p>Page {pageNumber} of {numPages}</p> */}
        </div>
      )}
    </div>
  );
};

export default PdfViewer;

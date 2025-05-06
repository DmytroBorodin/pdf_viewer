"use client";

import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import classes from "./styles.module.css";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface IPDFViewer {
  url: string;
}

function PDFViewer({ url }: IPDFViewer) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth(); // Initial set
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  return (
    <div ref={containerRef} className={classes.pdf}>
      <Document file={url} onLoadSuccess={onLoadSuccess}>
        <Page width={width} pageNumber={pageNumber} />
      </Document>
      <div className={classes.pagination}>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <div className={classes.buttons}>
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, numPages))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PDFViewer);

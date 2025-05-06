"use client";
import { PDFDocument } from "pdf-lib";
import { createContext, useContext, useState } from "react";

export interface PdfObj {
  title: string;
  blob: Blob;
  key: string;
}

export interface IGeneratePdfContext {
  pdfFiles: PdfObj[];
  addPdf: (_pdfObj: PdfObj) => void;
  deletePdf: (_title: string, _key: string) => void;
  generatePdf: () => Promise<string>;
}

const GeneratePdfContext = createContext<IGeneratePdfContext>({
  pdfFiles: [],
  addPdf: (_pdfObj: PdfObj) => {},
  deletePdf: (_title: string, _key: string) => {},
  generatePdf: async () => "",
});

export const GeneratePdfProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [pdfs, setPdfs] = useState<PdfObj[]>([]);

  const addPdf = (pdfObj: PdfObj) => {
    setPdfs((state) => [pdfObj, ...state]);
  };

  const mergePDFs = async () => {
    const mergedPdf = await PDFDocument.create();

    const blobs = pdfs.map((item) => item.blob);

    for (const blob of blobs) {
      const arrayBuffer = await blob.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const deletePdf = (title: string, key: string) => {
    setPdfs((state) =>
      state.filter((item) => {
        return item.title !== title || item.key !== key;
      })
    );
  };

  const value = {
    pdfFiles: pdfs,
    addPdf,
    deletePdf,
    generatePdf: mergePDFs,
  };

  return (
    <GeneratePdfContext.Provider value={value}>
      {children}
    </GeneratePdfContext.Provider>
  );
};

export const useGeneratePdfContext = () => {
  const { pdfFiles, addPdf, deletePdf, generatePdf } =
    useContext(GeneratePdfContext);
  return { pdfFiles, addPdf, deletePdf, generatePdf };
};

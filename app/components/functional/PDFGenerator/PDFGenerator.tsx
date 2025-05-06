"use client";

import PDFViewer from "@/app/components/functional/PDFViewer/PDFViewer";
import { useGeneratePdfContext } from "@/app/providers/generatePdfProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./styles.module.css";

export default function PDFGenerator() {
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);
  const { pdfFiles, deletePdf, generatePdf } = useGeneratePdfContext();
  const router = useRouter();

  const handleMerge = async () => {
    const mergedPdf = await generatePdf();
    setMergedUrl(mergedPdf);
  };

  const navigateToSongsList = () => {
    router.push("/");
  };
  return (
    <div className={classes.container}>
      <ul className={classes.songs}>
        {pdfFiles.map((item) => (
          <li key={item.title + item.key}>
            {item.title + " "}({item.key})
            <button onClick={() => deletePdf(item.title, item.key)}>X</button>
          </li>
        ))}
      </ul>
      {mergedUrl ? (
        <>
          <a href={mergedUrl} download="merged.pdf">
            <button>Download Merged PDF</button>
          </a>
          <button onClick={navigateToSongsList}>Go to main songs list</button>
        </>
      ) : (
        <>
          <button onClick={navigateToSongsList}>Add more songs</button>
          <button onClick={handleMerge}>Merge PDFs</button>
        </>
      )}

      {mergedUrl ? <PDFViewer url={mergedUrl} /> : null}
    </div>
  );
}

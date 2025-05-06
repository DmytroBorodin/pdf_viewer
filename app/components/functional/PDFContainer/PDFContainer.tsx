"use client";

import { downloadPdfBlob } from "@/app/components/functional/PDFContainer/utils";
import PDFViewer from "@/app/components/functional/PDFViewer/PDFViewer";
import { useGeneratePdfContext } from "@/app/providers/generatePdfProvider";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import classes from "./styles.module.css";

interface IPDFContainer {
  pdfUrl: string;
  pdfTitle: string;
  songKey: string;
}

export default function PDFContainer({
  pdfUrl,
  pdfTitle,
  songKey,
}: IPDFContainer) {
  const [pdfBlob, setPdfBlob] = useState<Blob>();
  const { data: session } = useSession();
  const { pdfFiles, addPdf } = useGeneratePdfContext();

  const extractDocId = (url: string) => {
    const match = url.match(/\/d\/([^/]+)/);
    return match ? match[1] : "";
  };

  const docId = extractDocId(pdfUrl);

  useEffect(() => {
    const fetchPDFBlob = async () => {
      const blob = await downloadPdfBlob(docId, session?.accessToken as string);
      setPdfBlob(blob);
    };
    if (session) fetchPDFBlob();
  }, [session, songKey]);

  const addToPdf = () => {
    const pdf = {
      title: pdfTitle,
      blob: pdfBlob as Blob,
      key: songKey,
    };

    addPdf(pdf);
  };

  const isNotAdded = !!pdfFiles.findIndex(
    (item) => item.title === pdfTitle && item.key === songKey
  );

  const pdfUrlFromBlob = pdfBlob ? URL.createObjectURL(pdfBlob) : "";

  console.log(songKey);

  return (
    <>
      <div className={classes.buttons}>
        {pdfBlob && isNotAdded ? (
          <button onClick={addToPdf}>Add to PDF</button>
        ) : null}
        <Link href="/generate-pdf">Go to generate PDF page</Link>
        <Link href="/">Go to main list</Link>
      </div>
      <PDFViewer url={pdfUrlFromBlob} />
    </>
  );
}

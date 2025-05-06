import PDFGenerator from "@/app/components/functional/PDFGenerator/PDFGenerator";

export default async function GeneratePdf() {
  return (
    <>
      <h1>Generate PDF</h1>
      <PDFGenerator />
    </>
  );
}

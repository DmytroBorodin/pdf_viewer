"use client";
import { GeneratePdfProvider } from "@/app/providers/generatePdfProvider";
import "./globals.css";
import styles from "./page.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GeneratePdfProvider>
          <main className={styles.main}>{children}</main>
        </GeneratePdfProvider>
      </body>
    </html>
  );
}

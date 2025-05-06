"use client";
import { ISong } from "@/app/api/types";
import { SessionProvider } from "next-auth/react";
import { ChangeEvent, useState } from "react";

import PDFContainer from "@/app/components/functional/PDFContainer/PDFContainer";
import classes from "./styles.module.css";

interface ISongData {
  song?: ISong;
}

export default function SongData({ song }: ISongData) {
  const [key, setKey] = useState(song?.defaultKey || "");
  const songData = song
    ? song.songData.find((item) => item.key === song.defaultKey)
    : null;

  const [pdfLink, setPdfLink] = useState(songData ? songData?.pdfLink : "");

  const keyOptions = song
    ? song.songData.map((item) => (
        <option key={item.key} value={item.key}>
          {item.key}
        </option>
      ))
    : [];

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newKey = e.target.value;
    const newKeyData = song
      ? song.songData.find((item) => item.key === newKey)
      : null;
    setKey(newKey);
    setPdfLink(newKeyData ? newKeyData.pdfLink : "");
  };

  return (
    <>
      <h1>{song?.title}</h1>
      <div className={classes.select}>
        <select
          style={{
            width: "150px",
            height: "30px",
          }}
          value={key}
          onChange={handleOnChange}
        >
          {keyOptions}
        </select>
      </div>
      <SessionProvider>
        <PDFContainer
          songKey={key}
          pdfTitle={song?.title || ""}
          pdfUrl={pdfLink}
        />
      </SessionProvider>
    </>
  );
}

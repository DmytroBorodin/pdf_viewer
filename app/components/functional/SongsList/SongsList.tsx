import { ISong } from "@/app/api/types";
import Link from "next/link";
import classes from "./styles.module.css";

interface ISongsList {
  songs: ISong[];
}

export default function SongsList({ songs }: ISongsList) {
  return (
    <ul className={classes.songs}>
      {songs.map((item: ISong, idx: number) => (
        <li key={item.id}>
          <span>{idx + 1}. </span>
          <Link href={"/songs/" + item.id}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}

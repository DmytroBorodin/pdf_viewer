import { getCollection } from "@/app/api/utils";
import SongsList from "@/app/components/functional/SongsList/SongsList";

export default async function Home() {
  const collection = await getCollection();
  const songs = await collection
    .find()
    .collation({ locale: "uk" })
    .sort({ title: 1 })
    .toArray();
  return (
    <>
      <h1>Worship Songs List</h1>
      <SongsList songs={songs} />
    </>
  );
}

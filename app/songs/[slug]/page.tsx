import { getCollection } from "@/app/api/utils";
import SongData from "@/app/components/functional/SongData/SongData";
interface ISong {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Song({ params }: ISong) {
  const { slug } = await params;
  const collection = await getCollection();
  const song = await collection.findOne({
    id: +slug,
  });

  song._id = undefined;

  return (
    <main>
      <SongData song={song} />
    </main>
  );
}

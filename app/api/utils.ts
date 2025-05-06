import clientPromise from "@/lib/mongodb";

export const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db("worship_songs");
  return db.collection("songs");
};

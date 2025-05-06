import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("myDatabase");
  const collection = db.collection("test");

  const docs = await collection.find({}).toArray();
  return Response.json(docs);
}

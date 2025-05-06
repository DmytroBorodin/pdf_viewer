import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalValue = global as any;
if (!globalValue._mongoClientPromise) {
  client = new MongoClient(uri as string);
  globalValue._mongoClientPromise = client.connect();
}
const clientPromise = globalValue._mongoClientPromise;

export default clientPromise;

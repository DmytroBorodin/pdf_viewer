import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri as string);
  global._mongoClientPromise = client.connect();
}
const clientPromise = global._mongoClientPromise;

export default clientPromise;

import { getCollection } from "@/app/api/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const collection = await getCollection();
  const docs = await collection.find().toArray();
  console.log(docs);
  return NextResponse.json(docs);
}

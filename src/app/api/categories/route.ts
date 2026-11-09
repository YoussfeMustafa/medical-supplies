import { NextResponse } from "next/server";
import { mockDb } from "@/services/mock-db";

export async function GET() {
  const categories = mockDb.getCategories();
  return NextResponse.json(categories);
}

import { NextResponse } from "next/server";
import { mockDb } from "@/services/mock-db";

export async function GET() {
  const brands = mockDb.getBrands();
  return NextResponse.json(brands);
}

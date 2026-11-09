import { NextResponse } from "next/server";
import { mockDb } from "@/services/mock-db";

export async function GET() {
  const stats = mockDb.getAdminStats();
  return NextResponse.json(stats);
}

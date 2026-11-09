import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/services/mock-db";

export async function GET() {
  const rfqs = mockDb.getRFQs();
  return NextResponse.json(rfqs);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rfq = mockDb.createRFQ(body);
    return NextResponse.json(rfq, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

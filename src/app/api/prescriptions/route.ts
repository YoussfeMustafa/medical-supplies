import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/services/mock-db";

export async function GET() {
  const prescriptions = mockDb.getPrescriptions();
  return NextResponse.json(prescriptions);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prescription = mockDb.createPrescription(body);
    return NextResponse.json(prescription, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

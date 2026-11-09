import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/services/mock-db";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") || undefined;
  const orders = mockDb.getOrders(userId);
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const order = mockDb.createOrder(body);
    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

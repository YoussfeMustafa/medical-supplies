import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/services/mock-db";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const product = mockDb.getProductBySlug(params.slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = mockDb.getProductBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const body = await request.json();
    const updated = mockDb.updateProduct(product.id, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const product = mockDb.getProductBySlug(params.slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  const deleted = mockDb.deleteProduct(product.id);
  return NextResponse.json({ success: deleted });
}

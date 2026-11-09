import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/services/mock-db";
import { ProductFilters } from "@/types/api.types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const filters: ProductFilters = {
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    brand: searchParams.get("brand") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    minRating: searchParams.get("minRating")
      ? Number(searchParams.get("minRating"))
      : undefined,
    inStockOnly: searchParams.get("inStockOnly") === "true",
    requiresPrescription: searchParams.has("requiresPrescription")
      ? searchParams.get("requiresPrescription") === "true"
      : undefined,
    sortBy: (searchParams.get("sortBy") as any) || "featured",
    page: Number(searchParams.get("page") || 1),
    limit: Number(searchParams.get("limit") || 12),
  };

  const result = mockDb.getProducts(filters);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = mockDb.createProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

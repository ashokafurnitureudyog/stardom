import { NextResponse } from "next/server";
import { getCachedProducts } from "@/lib/controllers/ProductControllers";

// Update GET products route
export async function GET() {
  try {
    const mappedProducts = await getCachedProducts();
    return NextResponse.json(mappedProducts);
  } catch (error: unknown) {
    console.error("Failed to fetch products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch products";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

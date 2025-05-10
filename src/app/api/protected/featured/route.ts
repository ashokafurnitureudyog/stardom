/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import {
  addToFeatured,
  removeFromFeatured,
  getFeaturedProducts,
} from "@/lib/controllers/FeaturedControllers";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { productId } = data;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    const result = await addToFeatured(productId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error adding product to featured:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add product to featured" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { productId } = data;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    await removeFromFeatured(productId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error removing product from featured:", error);
    return NextResponse.json(
      { error: error.message || "Failed to remove product from featured" },
      { status: 500 },
    );
  }
}

// This isn't strictly necessary as we have the /api/featured GET endpoint
// but including for completeness
export async function GET() {
  try {
    const featured = await getFeaturedProducts();
    return NextResponse.json(featured);
  } catch (error: any) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch featured products" },
      { status: 500 },
    );
  }
}

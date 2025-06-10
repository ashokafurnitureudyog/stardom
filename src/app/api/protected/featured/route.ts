import { NextRequest, NextResponse } from "next/server";
import {
  addToFeatured,
  removeFromFeatured,
  getFeaturedProducts,
} from "@/lib/controllers/FeaturedControllers";
import { apiHandler, parseRequestJson } from "@/lib/utils/api-utils";

export async function POST(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const data = await parseRequestJson<{ productId: string }>(req);
    const { productId } = data;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    return await addToFeatured(productId);
  });
}

export async function DELETE(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const data = await parseRequestJson<{ productId: string }>(req);
    const { productId } = data;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    await removeFromFeatured(productId);
    return { success: true };
  });
}

// This isn't strictly necessary as we have the /api/featured GET endpoint
// but including for completeness
export async function GET() {
  return apiHandler({} as NextRequest, async () => {
    return await getFeaturedProducts();
  });
}

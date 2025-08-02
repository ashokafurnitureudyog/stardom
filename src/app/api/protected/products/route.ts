import { NextRequest, NextResponse } from "next/server";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/controllers/ProductControllers";
import { apiHandler, parseRequestFormData } from "@/lib/utils/api-utils";

export async function POST(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const formData = await parseRequestFormData(req);

    // Extract files
    const files = formData
      .getAll("files")
      .filter((item) => item instanceof File) as File[];

    // Extract product data
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      collection: formData.get("collection") as string,
      features: JSON.parse((formData.get("features") as string) || "[]"),
      colors: JSON.parse((formData.get("colors") as string) || "[]"),
      images: JSON.parse((formData.get("imageUrls") as string) || "[]"),
    };

    // Verify required fields
    if (!productData.name || !productData.description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 },
      );
    }

    return await addProduct(productData, files);
  });
}

export async function PUT(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const formData = await parseRequestFormData(req);

    // Get product ID
    const productId = formData.get("id") as string;
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required for updates" },
        { status: 400 },
      );
    }

    // Extract files
    const files = formData
      .getAll("files")
      .filter((item) => item instanceof File) as File[];

    // Extract product data
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      collection: formData.get("collection") as string,
      features: JSON.parse((formData.get("features") as string) || "[]"),
      colors: JSON.parse((formData.get("colors") as string) || "[]"),
      images: JSON.parse((formData.get("imageUrls") as string) || "[]"),
    };

    const result = await updateProduct(productId, productData, files);
    return result || { success: true, id: productId };
  });
}

export async function DELETE(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const data = await req.json();
    const { productId, imageUrls } = data;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    await deleteProduct(productId, Array.isArray(imageUrls) ? imageUrls : []);

    return { success: true };
  });
}

import { NextRequest, NextResponse } from "next/server";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/controllers/ProductControllers";
import { apiHandler } from "@/lib/utils/api-utils";

export async function POST(request: NextRequest) {
  return apiHandler(request, async (req) => {
    // Parse JSON data instead of FormData
    const productData = await req.json();

    // Verify required fields
    if (!productData.name || !productData.description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 },
      );
    }

    // Adapt the data to the format expected by the controller
    const formattedData = {
      name: productData.name,
      description: productData.description,
      category: productData.category,
      collection: productData.collection,
      features: productData.features || [],
      colors: productData.colors || [],
      images: productData.images || [],
    };

    // Call the controller with no files (files are now uploaded directly)
    return await addProduct(formattedData);
  });
}

export async function PUT(request: NextRequest) {
  return apiHandler(request, async (req) => {
    // Parse JSON data instead of FormData
    const productData = await req.json();

    // Get product ID
    const productId = productData.id;
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required for updates" },
        { status: 400 },
      );
    }

    // Verify required fields
    if (!productData.name || !productData.description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 },
      );
    }

    // Adapt the data to the format expected by the controller
    const formattedData = {
      name: productData.name,
      description: productData.description,
      category: productData.category,
      collection: productData.collection,
      features: productData.features || [],
      colors: productData.colors || [],
      images: productData.images || [],
      removedImages: productData.removedImages,
    };

    // Call the controller with no files (files are now uploaded directly)
    const result = await updateProduct(productId, formattedData);
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

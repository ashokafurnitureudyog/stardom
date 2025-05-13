/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/controllers/ProductControllers";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

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

    const result = await addProduct(productData, files);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add product" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();

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
    return NextResponse.json(result || { success: true, id: productId });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { productId, imageUrls } = data;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    await deleteProduct(productId, Array.isArray(imageUrls) ? imageUrls : []);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting product:", error);

    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: 500 },
    );
  }
}

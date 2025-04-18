/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import {
  addProduct,
  deleteProduct,
} from "@/lib/controllers/ProductControllers";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      collection: formData.get("collection") as string,
      features: JSON.parse(formData.get("features") as string),
      colors: JSON.parse(formData.get("colors") as string),
      images: [] as string[],
    };

    const result = await addProduct(productData, files);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to add product" },
      { status: 401 }, // Changed to 401 Unauthorized
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { productId, imageUrls } = await req.json();
    await deleteProduct(productId, imageUrls);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: 401 }, // Changed to 401 Unauthorized
    );
  }
}

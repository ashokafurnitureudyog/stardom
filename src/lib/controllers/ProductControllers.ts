"use server";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { deleteFilesFromStorage } from "@/lib/actions/storage-actions";

interface ProductInput {
  name: string;
  description: string;
  category: string;
  collection: string;
  images: string[];
  features: string[];
  colors: string[];
  removedImages?: string[];
}

interface ProductResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export const addProduct = async (
  productData: ProductInput,
): Promise<ProductResponse> => {
  try {
    const { database } = await createAdminClient();

    const result = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
      ID.unique(),
      {
        name: productData.name,
        description: productData.description,
        category: productData.category,
        product_collection: productData.collection,
        features: productData.features,
        colors: productData.colors,
        images: productData.images,
      },
    );

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("Failed to add product:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to add product";
    return { success: false, error: errorMessage };
  }
};

export const updateProduct = async (
  productId: string,
  productData: ProductInput,
): Promise<ProductResponse> => {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_PRODUCTS_COLLECTION_ID!;
    const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!;

    // Get the current product (we don't need to read the images, just ensure we can update the product)
    await database.getDocument(databaseId, collectionId, productId);

    // Process removed images if they were explicitly provided
    if (productData.removedImages && productData.removedImages.length > 0) {
      // Delete the removed images from storage
      await deleteFilesFromStorage(productData.removedImages, bucketId);
    }

    // Update the document with new image URLs
    const result = await database.updateDocument(
      databaseId,
      collectionId,
      productId,
      {
        name: productData.name,
        description: productData.description,
        category: productData.category,
        product_collection: productData.collection,
        features: productData.features,
        colors: productData.colors,
        images: productData.images,
      },
    );

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("Failed to update product:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update product";
    return { success: false, error: errorMessage };
  }
};

// Keep deleteProduct function as is
export const deleteProduct = async (
  productId: string,
  imageUrls: string[] = [],
): Promise<ProductResponse> => {
  try {
    const { database } = await createAdminClient();
    const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!;

    // Delete images from storage
    if (imageUrls && imageUrls.length > 0) {
      await deleteFilesFromStorage(imageUrls, bucketId);
    }

    // Try to delete from featured collection if it exists
    // This should happen ONCE per product, not for each image
    try {
      if (process.env.APPWRITE_FEATURED_COLLECTION_ID) {
        await database.deleteDocument(
          process.env.APPWRITE_DATABASE_ID!,
          process.env.APPWRITE_FEATURED_COLLECTION_ID,
          productId,
        );
      }
    } catch (error: unknown) {
      // Use the error in a logging statement to avoid the unused variable warning
      console.error(
        "Product was not in featured collection or collection doesn't exist:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }

    // Delete the product document
    const result = await database.deleteDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
      productId,
    );

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("Failed to delete product:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete product";
    return { success: false, error: errorMessage };
  }
};

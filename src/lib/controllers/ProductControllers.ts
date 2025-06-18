"use server";
import { ID, Permission, Role } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";

interface ProductInput {
  name: string;
  description: string;
  category: string;
  collection: string;
  images: string[];
  features: string[];
  colors: string[];
}

interface ProductResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export const addProduct = async (
  productData: ProductInput,
  files?: File[],
): Promise<ProductResponse> => {
  try {
    const { database, storage } = await createAdminClient();

    // File upload logic
    const uploadedUrls: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        try {
          const fileId = ID.unique();
          await storage.createFile(
            process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!,
            fileId,
            file,
            [Permission.read(Role.any())],
          );
          uploadedUrls.push(
            `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT}`,
          );
        } catch (uploadError: unknown) {
          console.error(
            "File upload error:",
            uploadError instanceof Error
              ? uploadError.message
              : "Unknown error",
          );
        }
      }
    }

    // Use product_collection instead of collection in the document
    console.log("Creating product with data:", {
      ...productData,
      product_collection: productData.collection, // Note the renamed field
      images: [...productData.images, ...uploadedUrls],
    });

    const result = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
      ID.unique(),
      {
        name: productData.name,
        description: productData.description,
        category: productData.category,
        product_collection: productData.collection, // Changed to product_collection
        features: productData.features,
        colors: productData.colors,
        images: [...productData.images, ...uploadedUrls],
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
  files?: File[],
): Promise<ProductResponse> => {
  try {
    const { database, storage } = await createAdminClient();

    // File upload logic (unchanged)
    const uploadedUrls: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        try {
          const fileId = ID.unique();
          await storage.createFile(
            process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!,
            fileId,
            file,
            [Permission.read(Role.any())],
          );
          uploadedUrls.push(
            `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT}`,
          );
        } catch (uploadError: unknown) {
          console.error(
            "File upload error:",
            uploadError instanceof Error
              ? uploadError.message
              : "Unknown error",
          );
        }
      }
    }

    const result = await database.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
      productId,
      {
        name: productData.name,
        description: productData.description,
        category: productData.category,
        product_collection: productData.collection, // Changed to product_collection
        features: productData.features,
        colors: productData.colors,
        images: [...productData.images, ...uploadedUrls],
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

// Fixed delete product function
export const deleteProduct = async (
  productId: string,
  imageUrls: string[] = [],
): Promise<ProductResponse> => {
  try {
    const { database, storage } = await createAdminClient();

    // Image deletion logic - only delete from storage if it's an Appwrite URL
    const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!;

    // Delete images from storage
    if (imageUrls && imageUrls.length > 0) {
      for (const url of imageUrls) {
        try {
          // Only try to delete from storage if it's an Appwrite URL
          if (url.includes("appwrite.io") && url.includes("/files/")) {
            const fileId = url.split("/files/")[1]?.split("/view")[0];
            if (fileId) {
              console.log("Deleting file from storage:", fileId);
              await storage.deleteFile(bucketId, fileId);
            }
          } else {
            // For external URLs, just log that we're skipping storage deletion
            console.log("Skipping storage deletion for external URL:", url);
          }
        } catch (deleteError: unknown) {
          console.error(
            "Failed to delete image from storage:",
            deleteError instanceof Error
              ? deleteError.message
              : "Unknown error",
          );
          // Continue with other deletions even if one fails
        }
      }
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
        console.log("Product removed from featured collection");
      }
    } catch (error: unknown) {
      // Use the error in a logging statement to avoid the unused variable warning
      console.log(
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

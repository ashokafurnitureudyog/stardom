/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { ID, Permission, Role } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";

export const addProduct = async (
  productData: {
    name: string;
    description: string;
    category: string;
    collection: string; // We'll still accept 'collection' in the function parameter for consistency
    images: string[];
    features: string[];
    colors: string[];
  },
  files?: File[],
) => {
  const { database, storage } = await createAdminClient();

  // File upload logic
  const uploadedUrls = [];
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
      } catch (error) {
        console.error("File upload error:", error);
      }
    }
  }

  // Use product_collection instead of collection in the document
  console.log("Creating product with data:", {
    ...productData,
    product_collection: productData.collection, // Note the renamed field
    images: [...productData.images, ...uploadedUrls],
  });

  return database.createDocument(
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
};

export const updateProduct = async (
  productId: string,
  productData: {
    name: string;
    description: string;
    category: string;
    collection: string; // Still accept 'collection' in the parameter
    images: string[];
    features: string[];
    colors: string[];
  },
  files?: File[],
) => {
  const { database, storage } = await createAdminClient();

  // File upload logic (unchanged)
  const uploadedUrls = [];
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
      } catch (error) {
        console.error("File upload error:", error);
      }
    }
  }

  // Update with product_collection instead of collection
  console.log("Updating product ID:", productId);
  console.log("With data:", {
    ...productData,
    product_collection: productData.collection, // Note the renamed field
    images: [...productData.images, ...uploadedUrls],
  });

  return database.updateDocument(
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
};

// Fixed delete product function
export const deleteProduct = async (
  productId: string,
  imageUrls: string[] = [],
) => {
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
      } catch (error) {
        console.error("Failed to delete image from storage:", error);
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
  } catch (error) {
    console.log(
      "Product was not in featured collection or featured collection doesn't exist",
    );
  }

  // Delete the product document
  return database.deleteDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
    productId,
  );
};

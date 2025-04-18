"use server";
import { ID, Permission, Role } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";

// Individual server actions instead of object
export const addProduct = async (
  productData: {
    name: string;
    description: string;
    category: string;
    collection: string;
    images: string[];
    features: string[];
    colors: string[];
  },
  files?: File[],
) => {
  const { database, storage } = await createAdminClient();

  // File upload logic
  const uploadedUrls = [];
  if (files) {
    for (const file of files) {
      const fileId = ID.unique();
      await storage.createFile(
        process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!,
        fileId,
        file,
        [
          Permission.read(Role.any()), // Allow public read access
        ],
      );
      uploadedUrls.push(
        `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT}`,
      );
    }
  }

  return database.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
    ID.unique(),
    {
      ...productData,
      images: [...productData.images, ...uploadedUrls],
    },
  );
};

export const deleteProduct = async (productId: string, imageUrls: string[]) => {
  const { database, storage, account } = await createAdminClient();

  // Admin verification
  const user = await account.get();
  if (user.$id !== process.env.APPWRITE_ADMIN_USER_ID) {
    throw new Error("Unauthorized access");
  }

  // Image deletion logic
  const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!;
  for (const url of imageUrls) {
    const fileId = url.split("/files/")[1]?.split("/view")[0];
    if (fileId) await storage.deleteFile(bucketId, fileId);
  }

  return database.deleteDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
    productId,
  );
};

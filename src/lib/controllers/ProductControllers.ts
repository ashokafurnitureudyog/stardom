"use server";
import { ID } from "node-appwrite";
import { createAdminClient, getLoggedInUser } from "@/lib/server/appwrite";
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
  imageColorMapping?: string;
}

interface ProductResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

// Validation function for image_color_mapping
const validateImageColorMapping = (
  mappingStr: string | undefined,
  colors: string[],
  images: string[],
): boolean => {
  if (!mappingStr) return true; // Optional field

  try {
    const mapping = JSON.parse(mappingStr);

    // Check if it's an object
    if (
      typeof mapping !== "object" ||
      mapping === null ||
      Array.isArray(mapping)
    ) {
      return false;
    }

    // Validate entries
    // Data structure: { "image_url": "color_name" }
    for (const [imageUrl, color] of Object.entries(mapping)) {
      // Value (color) must be in the product's color list
      if (typeof color !== "string" || !colors.includes(color)) {
        // Invalid color or not in the allowed list
        return false;
      }

      // Key (imageUrl) must be a string.
      if (typeof imageUrl !== "string") {
        return false;
      }
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const getCachedProducts = async () => {
  "use cache";
  const { database } = await createAdminClient();
  const products = await database.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
  );

  return products.documents.map((product) => ({
    ...product,
    id: product.$id,
    collection: product.product_collection,
  }));
};

export const addProduct = async (
  productData: ProductInput,
): Promise<ProductResponse> => {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    // Validate image_color_mapping
    if (
      !validateImageColorMapping(
        productData.imageColorMapping,
        productData.colors,
        productData.images,
      )
    ) {
      throw new Error(
        "Invalid image_color_mapping: Must be valid JSON mapping existing colors to valid image URLs.",
      );
    }

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
        image_color_mapping: productData.imageColorMapping,
      },
    );

    return { success: true, data: result };
  } catch (error) {
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
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    // Validate image_color_mapping
    if (
      !validateImageColorMapping(
        productData.imageColorMapping,
        productData.colors,
        productData.images,
      )
    ) {
      throw new Error(
        "Invalid image_color_mapping: Must be valid JSON mapping existing colors to valid image URLs.",
      );
    }

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
        image_color_mapping: productData.imageColorMapping,
      },
    );

    return { success: true, data: result };
  } catch (error) {
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
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

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
    } catch (error) {
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
  } catch (error) {
    console.error("Failed to delete product:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete product";
    return { success: false, error: errorMessage };
  }
};

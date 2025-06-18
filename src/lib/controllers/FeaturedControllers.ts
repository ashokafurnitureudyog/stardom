"use server";
import { createAdminClient } from "@/lib/server/appwrite";
import { AppwriteException, Query } from "node-appwrite";

// Get a product by ID
async function getProductById(productId: string) {
  const { database } = await createAdminClient();
  return database.getDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
    productId,
  );
}

// Count featured products
async function countFeaturedProducts() {
  const { database } = await createAdminClient();
  const featured = await database.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_FEATURED_COLLECTION_ID!,
    [Query.limit(100)], // Set a high limit to get accurate count
  );

  return featured.total;
}

// Get all featured products
export async function getFeaturedProducts() {
  const { database } = await createAdminClient();
  const featured = await database.listDocuments(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_FEATURED_COLLECTION_ID!,
  );

  return featured.documents;
}

// Check if a product is already featured
async function isProductFeatured(productId: string) {
  try {
    const { database } = await createAdminClient();
    await database.getDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FEATURED_COLLECTION_ID!,
      productId,
    );
    return true;
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 404) {
      return false;
    }
    throw error;
  }
}

// Add a product to featured
export async function addToFeatured(productId: string) {
  // Check if already featured
  const alreadyFeatured = await isProductFeatured(productId);
  if (alreadyFeatured) {
    return { success: false, message: "Product is already featured" };
  }

  // Check featured count
  const count = await countFeaturedProducts();
  if (count >= 4) {
    throw new Error(
      "Maximum of 4 featured products allowed. Remove one before adding another.",
    );
  }

  // Get product data from products collection
  const product = await getProductById(productId);

  // Add to featured collection with the same ID
  const { database } = await createAdminClient();
  await database.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_FEATURED_COLLECTION_ID!,
    productId,
    {
      name: product.name,
      description: product.description,
      category: product.category,
      product_collection: product.product_collection,
      features: product.features,
      colors: product.colors,
      images: product.images,
    },
  );

  return { success: true, message: "Product added to featured" };
}

// Remove a product from featured
export async function removeFromFeatured(productId: string) {
  const { database } = await createAdminClient();
  await database.deleteDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_FEATURED_COLLECTION_ID!,
    productId,
  );

  return { success: true };
}

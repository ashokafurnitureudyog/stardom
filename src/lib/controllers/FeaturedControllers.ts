"use server";
import { updateTag } from "next/cache";
import { AppwriteException, Query } from "node-appwrite";
import { createAdminClient, getLoggedInUser } from "@/lib/server/appwrite";
import { FEATURED_TAG } from "@/lib/server/products";

// Get a product by ID
async function getProductById(productId: string) {
  const { database } = await createAdminClient();
  return database.getRow({
    databaseId: process.env.APPWRITE_DATABASE_ID!,
    tableId: process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
    rowId: productId,
  });
}

// Count featured products
async function countFeaturedProducts() {
  const { database } = await createAdminClient();
  const featured = await database.listRows({
    databaseId: process.env.APPWRITE_DATABASE_ID!,
    tableId: process.env.APPWRITE_FEATURED_COLLECTION_ID!,
    queries: [Query.limit(100)],
  });

  return featured.total;
}

// Get all featured products
export async function getFeaturedProducts() {
  const { database } = await createAdminClient();
  const featured = await database.listRows({
    databaseId: process.env.APPWRITE_DATABASE_ID!,
    tableId: process.env.APPWRITE_FEATURED_COLLECTION_ID!,
    queries: [Query.limit(100)],
  });

  return featured.rows;
}

// Check if a product is already featured
async function isProductFeatured(productId: string) {
  try {
    const { database } = await createAdminClient();
    await database.getRow({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_FEATURED_COLLECTION_ID!,
      rowId: productId,
    });
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
  const user = await getLoggedInUser();
  if (!user) throw new Error("Unauthorized");

  // Check if already featured
  const alreadyFeatured = await isProductFeatured(productId);
  if (alreadyFeatured) {
    return { success: false, message: "Product is already featured" };
  }

  // Check featured count
  const count = await countFeaturedProducts();
  if (count >= 4) {
    throw new Error("Maximum of 4 featured products allowed. Remove one before adding another.");
  }

  // Get product data from products collection
  const product = await getProductById(productId);

  // Add to featured collection with the same ID
  const { database } = await createAdminClient();
  await database.createRow({
    databaseId: process.env.APPWRITE_DATABASE_ID!,
    tableId: process.env.APPWRITE_FEATURED_COLLECTION_ID!,
    rowId: productId,
    data: {
      name: product.name,
      description: product.description,
      category: product.category,
      product_collection: product.product_collection,
      features: product.features,
      colors: product.colors,
      images: product.images,
    },
  });

  updateTag(FEATURED_TAG);
  return { success: true, message: "Product added to featured" };
}

// Remove a product from featured
export async function removeFromFeatured(productId: string) {
  const user = await getLoggedInUser();
  if (!user) throw new Error("Unauthorized");

  const { database } = await createAdminClient();
  await database.deleteRow({
    databaseId: process.env.APPWRITE_DATABASE_ID!,
    tableId: process.env.APPWRITE_FEATURED_COLLECTION_ID!,
    rowId: productId,
  });

  updateTag(FEATURED_TAG);
  return { success: true };
}

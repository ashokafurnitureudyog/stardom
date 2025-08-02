import { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/server/appwrite";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://stardom.co.in";

  // Static routes
  const routes = [
    "",
    "/products",
    "/heritage",
    "/portfolio",
    "/contact",
    "/faqs",
    "/shipping-info",
    "/cookie-policy",
    "/privacy-policy",
    "/returns",
    "/terms-of-service",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Get products data directly from database
  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    // Access database directly - this avoids the API call during build
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_PRODUCTS_COLLECTION_ID!;

    const response = await database.listDocuments(databaseId, collectionId);

    // Add dynamic product routes
    productRoutes = response.documents.map((doc) => ({
      url: `${baseUrl}/products/${doc.$id}`,
      lastModified: new Date(doc.$updatedAt || doc.$createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7, // Slightly lower priority than main pages
    }));
  } catch (error) {
    console.error("Error generating product sitemap routes:", error);
    // Continue with empty productRoutes array if there's an error
  }

  return [...routes, ...productRoutes];
}

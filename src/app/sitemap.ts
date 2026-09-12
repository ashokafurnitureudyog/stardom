import type { MetadataRoute } from "next";
import { getProductSitemapEntries } from "@/lib/server/products";

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

  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    const products = await getProductSitemapEntries();
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Could not add products to the sitemap:", error);
  }

  return [...routes, ...productRoutes];
}

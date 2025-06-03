import { MetadataRoute } from "next";
import { mockProducts } from "@/lib/constants/Products";

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

  // Get products data
  // For static rendering at build time with mock data:
  const products = mockProducts;

  // For dynamic data in production, you would use:
  // const products = await productService.getProducts();

  // Add dynamic product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7, // Slightly lower priority than main pages
  }));

  return [...routes, ...productRoutes];
}

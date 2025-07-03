import { Metadata } from "next";
import { generateProductMetadata } from "@/lib/seo/page-metadata";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/dynamic-schemas";
import { getProductById } from "@/lib/server/server-products";
import ProductDisplay from "./ProductDisplay";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for this product page
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  // Await the params object first
  const resolvedParams = await params;

  // Then use the id property
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    return {
      title: "Product Not Found | Stardom Office Furniture",
      description: "The requested product could not be found.",
    };
  }

  return generateProductMetadata({
    id: resolvedParams.id,
    name: product.name,
    description:
      product.description ||
      `Premium ${product.name} by Stardom Office Furniture`,
    images: product.images || [],
    category: product.category,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params object first
  const resolvedParams = await params;

  // Then use the id property for data fetching
  const product = await getProductById(resolvedParams.id);

  // Generate product schema
  const productSchema = product
    ? generateProductSchema({
        id: resolvedParams.id,
        name: product.name,
        description:
          product.description ||
          `Premium ${product.name} by Stardom Office Furniture`,
        images: product.images || [],
        category: product.category,
        sku: `STD-${resolvedParams.id.toUpperCase()}`,
        inStock: true,
      })
    : null;

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://stardom.co.in" },
    { name: "Products", url: "https://stardom.co.in/products" },
    {
      name: product?.category || "Category",
      url: `https://stardom.co.in/products/category/${product?.category?.toLowerCase().replace(/\s+/g, "-")}`,
    },
    {
      name: product?.name || "Product",
      url: `https://stardom.co.in/products/${resolvedParams.id}`,
    },
  ]);

  return (
    <>
      {/* Add structured data for SEO */}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Pass ID to the client component */}
      <ProductDisplay id={resolvedParams.id} initialProduct={product} />
    </>
  );
}

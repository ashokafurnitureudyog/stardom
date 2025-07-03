import { Metadata } from "next";
import { generateProductMetadata } from "@/lib/seo/page-metadata";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/dynamic-schemas";
import { getProductById } from "@/lib/server/server-products";
import ProductDisplay from "./ProductDisplay";
import { Product } from "@/types/ComponentTypes";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generates metadata for the product detail page
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Stardom Office Furniture",
      description: "The requested product could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return generateProductMetadata({
    id,
    name: product.name,
    description:
      product.description ||
      `Premium ${product.name} by Stardom Office Furniture`,
    images: product.images || [],
    category: product.category,
  });
}

/**
 * Creates breadcrumb path for the current product
 */
function createBreadcrumbPath(product: Product | undefined, productId: string) {
  const categorySlug =
    product?.category?.toLowerCase().replace(/\s+/g, "-") || "category";

  return [
    { name: "Home", url: "https://stardom.co.in" },
    { name: "Products", url: "https://stardom.co.in/products" },
    {
      name: product?.category || "Category",
      url: `https://stardom.co.in/products/category/${categorySlug}`,
    },
    {
      name: product?.name || "Product",
      url: `https://stardom.co.in/products/${productId}`,
    },
  ];
}

/**
 * Product detail page component
 */
export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  // Generate structured data for search engines
  const productSchema = product
    ? generateProductSchema({
        id,
        name: product.name,
        description:
          product.description ||
          `Premium ${product.name} by Stardom Office Furniture`,
        images: product.images || [],
        category: product.category,
      })
    : null;

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(
    createBreadcrumbPath(product, id),
  );

  return (
    <>
      {/* Structured data for SEO */}
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

      {/* Product display component with initial server data */}
      <ProductDisplay id={id} initialProduct={product} />
    </>
  );
}

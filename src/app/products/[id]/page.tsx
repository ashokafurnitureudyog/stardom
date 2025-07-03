import { Metadata } from "next";
import { generateProductMetadata } from "@/lib/seo/page-metadata";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/dynamic-schemas";
import { getProductById } from "@/lib/server/server-products";
import ProductDisplay from "./ProductDisplay";
import { Product } from "@/types/ComponentTypes";
import { JSX } from "react";

/**
 * Props for the ProductPage component
 *
 * @interface ProductPageProps
 */
interface ProductPageProps {
  /** Route parameters from Next.js dynamic routing */
  params: {
    /** Product ID from the URL path */
    id: string;
  };
}

/**
 * Generates metadata for the product detail page
 *
 * This function is called by Next.js during server rendering to generate
 * dynamic metadata based on the product being viewed.
 *
 * @param {ProductPageProps} props - Component props with route params
 * @returns {Promise<Metadata>} Dynamic metadata for the page
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = params;
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
 *
 * @param {Product | undefined} product - Product data
 * @param {string} productId - Product ID from URL
 * @returns {Array<{name: string, url: string}>} Array of breadcrumb items
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
 *
 * Server component that renders a product detail page with SEO enhancements,
 * structured data, and client-side interactivity via ProductDisplay
 *
 * @param {ProductPageProps} props - Component props
 * @returns {Promise<JSX.Element>} Rendered product page
 */
export default async function ProductPage({
  params,
}: ProductPageProps): Promise<JSX.Element> {
  const { id } = params;
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

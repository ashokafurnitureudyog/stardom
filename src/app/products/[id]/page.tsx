import { Metadata } from "next";
import { Suspense } from "react";
import { generateProductMetadata } from "@/lib/seo/page-metadata";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/dynamic-schemas";
import { getProductById, fetchAllProducts } from "@/lib/server/server-products";
import ProductDisplay from "./ProductDisplay";
import { Product } from "@/types/ComponentTypes";
import { ProductDetailsSkeleton } from "@/components/products/ProductDetailsSkeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate static params - fetches all product IDs for build-time prerendering
 * Required by Next.js 16 with cacheComponents enabled
 */
export async function generateStaticParams() {
  try {
    const products = await fetchAllProducts();
    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error("Error generating static params for products:", error);
    // Return a fallback to satisfy the cacheComponents requirement
    return [{ id: "placeholder" }];
  }
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
 * Async component that fetches and displays product content
 */
async function ProductContent({ id }: { id: string }) {
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

/**
 * Product detail page component
 * Wraps product content in Suspense for Next.js 16 compatibility
 */
export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductContent id={id} />
    </Suspense>
  );
}

import type { Metadata } from "next";

/**
 * Props for generating product page metadata
 * @interface ProductMetadataProps
 */
export interface ProductMetadataProps {
  /** Product unique identifier */
  id: string;
  /** Product name/title */
  name: string;
  /** Product description (should be SEO optimized) */
  description: string;
  /** Array of product image URLs */
  images: string[];
  /** Product price with currency symbol (optional) */
  price?: string;
  /** Product category name (optional) */
  category?: string;
}

/**
 * Props for generating category page metadata
 * @interface CategoryMetadataProps
 */
export interface CategoryMetadataProps {
  /** Category name */
  name: string;
  /** Category description (should be SEO optimized) */
  description: string;
  /** Number of products in this category (optional) */
  productCount?: number;
}

/**
 * Props for generating blog post metadata
 * @interface BlogPostMetadataProps
 */
export interface BlogPostMetadataProps {
  /** Blog post title */
  title: string;
  /** Blog post description/excerpt (should be SEO optimized) */
  description: string;
  /** ISO 8601 formatted date of publication */
  publishDate: string;
  /** Author name */
  author: string;
  /** Main blog post image URL (optional) */
  image?: string;
  /** Array of relevant tags/keywords (optional) */
  tags?: string[];
}

/**
 * Constants for brand-specific metadata
 */
const BRAND = {
  /** Company name */
  name: "Stardom",
  /** Parent company name */
  parentName: "Ashoka Furniture Udyog",
  /** Default suffix for page titles */
  titleSuffix: "Premium Office Furniture",
  /** Primary keywords always included */
  coreKeywords: [
    "premium office furniture",
    "Stardom furniture",
    "office furniture",
    "Ashoka Furniture Udyog",
  ],
};

/**
 * Generate SEO metadata for product pages
 *
 * Creates rich, structured metadata optimized for product listings
 * including OpenGraph and Twitter card data
 *
 * @param {ProductMetadataProps} product - Product data to generate metadata from
 * @returns {Metadata} Next.js metadata object for the product page
 */
export function generateProductMetadata(
  product: ProductMetadataProps,
): Metadata {
  // Generate SEO-friendly keywords
  const keywords = [
    product.name,
    product.category || "office furniture",
    "premium furniture",
    ...BRAND.coreKeywords,
  ];

  return {
    title: `${product.name} | ${BRAND.name} - ${BRAND.titleSuffix}`,
    description: product.description,

    openGraph: {
      title: `${product.name} | ${BRAND.titleSuffix} by ${BRAND.name}`,
      description: product.description,
      type: "website",
      images: product.images.map((image) => ({
        url: image,
        alt: `${product.name} - ${BRAND.name} Office Furniture`,
      })),
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${BRAND.name} Office Furniture`,
      description: product.description,
      images: product.images[0],
    },

    keywords,

    // Use existing product ID rather than generating a new slug
    other: {
      "product-id": product.id,
      "product-category": product.category || "office-furniture",
    },
  };
}

/**
 * Generate SEO metadata for category pages
 *
 * Creates metadata optimized for product category listings
 *
 * @param {CategoryMetadataProps} category - Category data to generate metadata from
 * @returns {Metadata} Next.js metadata object for the category page
 */
export function generateCategoryMetadata(
  category: CategoryMetadataProps,
): Metadata {
  // Add product count if available
  const extendedDescription = category.productCount
    ? `${category.description} Browse our collection of ${category.productCount} premium ${category.name.toLowerCase()} products.`
    : category.description;

  // Generate SEO-friendly keywords
  const keywords = [
    `${category.name} office furniture`,
    `${category.name} furniture`,
    ...BRAND.coreKeywords,
  ];

  return {
    title: `${category.name} | Office Furniture Category | ${BRAND.name}`,
    description: extendedDescription,

    openGraph: {
      title: `${category.name} - Office Furniture Category | ${BRAND.name}`,
      description: extendedDescription,
      type: "website",
    },

    keywords,

    other: {
      "category-name": category.name.toLowerCase(),
      "category-product-count": category.productCount?.toString() || "multiple",
    },
  };
}

/**
 * Generate SEO metadata for blog posts
 *
 * Creates rich metadata for blog content including author information,
 * publication date, and structured data for better search indexing
 *
 * @param {BlogPostMetadataProps} post - Blog post data to generate metadata from
 * @returns {Metadata} Next.js metadata object for the blog post
 */
export function generateBlogPostMetadata(
  post: BlogPostMetadataProps,
): Metadata {
  // Combine custom tags with default blog keywords
  const keywords = [
    ...(post.tags || []),
    "office design",
    "furniture blog",
    ...BRAND.coreKeywords,
  ];

  return {
    title: `${post.title} | ${BRAND.name} Office Furniture Blog`,
    description: post.description,
    authors: [{ name: post.author }],

    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.title }] : [],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image,
    },

    keywords,

    // Add structured data reference for blog articles
    other: {
      "article:published_time": post.publishDate,
      "article:author": post.author,
      "article:tag": post.tags?.join(",") || "",
    },
  };
}

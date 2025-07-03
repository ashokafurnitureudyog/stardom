/**
 * Schema.org structured data generators for SEO
 * These functions create JSON-LD structured data to enhance search results
 */

/**
 * Product information required for generating Product schema
 */
export interface ProductSchemaProps {
  /** Unique product identifier */
  id: string;
  /** Product name/title */
  name: string;
  /** Product description */
  description: string;
  /** Array of product image URLs */
  images: string[];
  /** Product category name (optional) */
  category?: string;
}

/**
 * FAQ item structure with question and answer
 */
export interface FAQItem {
  /** The question text */
  question: string;
  /** The answer text (can include HTML) */
  answer: string;
}

/**
 * Article/blog post information for Article schema
 */
export interface ArticleSchemaProps {
  /** Unique article identifier */
  id: string;
  /** Article title */
  title: string;
  /** Article description or excerpt */
  description: string;
  /** ISO 8601 date when the article was published */
  publishDate: string;
  /** ISO 8601 date when the article was last modified (optional) */
  modifiedDate?: string;
  /** Name of the article author */
  author: string;
  /** Featured image URL (optional) */
  image?: string;
}

/**
 * Breadcrumb item for navigation paths
 */
export interface BreadcrumbItem {
  /** Breadcrumb link text */
  name: string;
  /** Full URL for the breadcrumb (including domain) */
  url: string;
}

/**
 * Product review information
 */
export interface ReviewSchemaProps {
  /** Name of the product being reviewed */
  productName: string;
  /** ID of the product being reviewed */
  productId: string;
  /** Name of the person writing the review */
  authorName: string;
  /** Numeric rating from 1-5 */
  reviewRating: number;
  /** Text content of the review */
  reviewBody: string;
  /** ISO 8601 date when the review was published */
  datePublished: string;
}

/**
 * Brand information for consistent usage across schemas
 */
const BRAND = {
  /** Base website URL */
  baseUrl: "https://stardom.co.in",
  /** Brand name */
  name: "Stardom",
  /** Parent company name */
  companyName: "Ashoka Furniture Udyog",
  /** Logo path */
  logoUrl: "https://stardom.co.in/images/logo.png",
  /** Default OG image */
  defaultImage: "https://stardom.co.in/og-image.png",
};

/**
 * Generate schema.org Product schema for enhanced product listings in search results
 *
 * Creates structured data that helps search engines understand product information and brand details.
 *
 * @param {ProductSchemaProps} product - Product information
 * @returns {object} JSON-LD structured data object for the product
 */
export function generateProductSchema(product: ProductSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BRAND.baseUrl}/product/${product.id}#product`,
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: BRAND.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: BRAND.companyName,
    },
    category: product.category || "Office Furniture",
  };
}

/**
 * Generate schema.org BreadcrumbList for navigation paths
 *
 * Creates structured data for breadcrumb navigation that may appear
 * in search results, showing the path hierarchy.
 *
 * @param {BreadcrumbItem[]} breadcrumbs - Array of breadcrumb items with names and URLs
 * @returns {object} JSON-LD structured data object for breadcrumbs
 */
export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

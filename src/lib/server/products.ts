import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { Query } from "node-appwrite";
import type { Product, SortOption } from "@/types/ComponentTypes";
import { appwriteIds, createAdminClient } from "./appwrite";

export const PRODUCTS_TAG = "products";
export const FEATURED_TAG = "featured-products";

/** Appwrite caps a single page at 100 rows; the catalogue is well under that. */
const PAGE_SIZE = 100;

const LIST_COLUMNS = ["name", "description", "category", "product_collection", "images", "colors"];

const toProduct = (row: Record<string, unknown>): Product =>
  ({
    ...row,
    id: row.$id,
  }) as unknown as Product;

async function listRows(queries: string[]) {
  const { tables } = await createAdminClient();
  const ids = appwriteIds();
  const { rows } = await tables.listRows({
    databaseId: ids.database,
    tableId: ids.products,
    queries,
  });
  return rows.map(toProduct);
}

const SORT_QUERIES: Record<SortOption, string> = {
  featured: Query.orderDesc("$createdAt"),
  "name-a-z": Query.orderAsc("name"),
  "name-z-a": Query.orderDesc("name"),
};

export interface ProductQuery {
  category?: string;
  collection?: string;
  search?: string;
  sort?: SortOption;
}

/**
 * Catalogue listing. Filtering, sorting and column selection all happen in
 * Appwrite, so a filtered page transfers only the rows it renders.
 */
export async function getProducts({
  category,
  collection,
  search,
  sort = "featured",
}: ProductQuery = {}): Promise<Product[]> {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("max");

  const queries = [Query.limit(PAGE_SIZE), Query.select(LIST_COLUMNS), SORT_QUERIES[sort]];
  if (category && category !== "all") queries.push(Query.equal("category", category));
  if (collection && collection !== "all") {
    queries.push(Query.equal("product_collection", collection));
  }

  const products = await listRows(queries);
  if (!search) return products;

  // Matched here rather than with Query.search, which needs a fulltext index on
  // every searchable column. The catalogue is one page, so it costs nothing.
  const needle = search.toLowerCase();
  return products.filter((product) =>
    [product.name, product.description, product.category, product.product_collection]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(needle)),
  );
}

export async function getProductById(id: string): Promise<Product | undefined> {
  "use cache";
  cacheTag(PRODUCTS_TAG, `product-${id}`);
  cacheLife("max");

  try {
    const { tables } = await createAdminClient();
    const ids = appwriteIds();
    const row = await tables.getRow({
      databaseId: ids.database,
      tableId: ids.products,
      rowId: id,
    });
    return toProduct(row);
  } catch (error) {
    console.error(`Error retrieving product ${id}:`, error);
    return undefined;
  }
}

/** Other products in the same category, used by the detail page. */
export async function getSimilarProducts(id: string, limit = 4): Promise<Product[]> {
  "use cache";
  cacheTag(PRODUCTS_TAG, `product-${id}`);
  cacheLife("max");

  const product = await getProductById(id);
  if (!product) return [];

  return listRows([
    Query.equal("category", product.category),
    Query.notEqual("$id", id),
    Query.select(LIST_COLUMNS),
    Query.limit(limit),
  ]);
}

/**
 * The products the dashboard has marked as featured. Each featured row carries
 * the product's own id, so the product itself is read fresh here rather than
 * from the copy stored alongside it, which goes stale the moment a product is
 * edited.
 */
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  "use cache";
  cacheTag(PRODUCTS_TAG, FEATURED_TAG);
  cacheLife("max");

  const ids = appwriteIds();
  if (!ids.featured) return [];

  const { tables } = await createAdminClient();
  const featured = await tables.listRows({
    databaseId: ids.database,
    tableId: ids.featured,
    queries: [Query.limit(limit), Query.select(["$id"])],
  });

  const featuredIds = featured.rows.map((row) => row.$id);
  if (featuredIds.length === 0) return [];

  const products = await listRows([
    Query.equal("$id", featuredIds),
    Query.select(LIST_COLUMNS),
    Query.limit(limit),
  ]);

  const order = new Map(featuredIds.map((id, index) => [id, index]));
  return products.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}

/** Every product id, for `generateStaticParams`. */
export async function getProductIds(): Promise<string[]> {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("max");

  const products = await listRows([Query.limit(PAGE_SIZE), Query.select(["$id"])]);
  return products.map((product) => product.id);
}

/** Distinct collections across the catalogue, for the filter bar. */
export async function getCollections(): Promise<string[]> {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("max");

  const products = await listRows([Query.limit(PAGE_SIZE), Query.select(["product_collection"])]);

  return [...new Set(products.map((product) => product.product_collection).filter(Boolean))].sort();
}

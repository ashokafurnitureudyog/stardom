import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { Query } from "node-appwrite";
import type { Product, SortOption } from "@/types/ComponentTypes";
import { appwriteIds, createAdminClient } from "./appwrite";

export const PRODUCTS_TAG = "products";

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

/** The newest product in each of the first few categories, for the home grid. */
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("max");

  const products = await getProducts();
  const seen = new Set<string>();
  const featured: Product[] = [];

  for (const product of products) {
    if (seen.has(product.category)) continue;
    seen.add(product.category);
    featured.push(product);
    if (featured.length === limit) break;
  }

  return featured;
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

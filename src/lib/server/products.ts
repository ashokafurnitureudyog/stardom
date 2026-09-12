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
  const [featured, catalogue] = await Promise.all([
    tables.listRows({
      databaseId: ids.database,
      tableId: ids.featured,
      queries: [Query.limit(limit), Query.orderAsc("$createdAt"), Query.select(["$id"])],
    }),
    getProducts(),
  ]);

  const byId = new Map(catalogue.map((product) => [product.id, product]));
  return featured.rows
    .map((row) => byId.get(row.$id))
    .filter((product): product is Product => Boolean(product));
}

/** Every product id, for `generateStaticParams`. */
export async function getProductIds(): Promise<string[]> {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("max");

  const products = await listRows([Query.limit(PAGE_SIZE), Query.select(["$id"])]);
  return products.map((product) => product.id);
}

export interface ProductSitemapEntry {
  id: string;
  updatedAt: string;
}

/**
 * Ids and last-modified dates for the sitemap. Deliberately uncached: the
 * sitemap route renders outside the prerender, where a "use cache" read is
 * rejected, and a crawler hitting it a few times a day does not need one.
 */
export async function getProductSitemapEntries(): Promise<ProductSitemapEntry[]> {
  const { tables } = await createAdminClient();
  const ids = appwriteIds();
  const { rows } = await tables.listRows({
    databaseId: ids.database,
    tableId: ids.products,
    queries: [Query.limit(PAGE_SIZE), Query.select(["$id", "$updatedAt"])],
  });

  return rows.map((row) => ({
    id: row.$id,
    updatedAt: (row.$updatedAt as string) ?? (row.$createdAt as string),
  }));
}

/**
 * Distinct collections, for the filter bar. Derived from the cached catalogue
 * rather than queried: the values are already in memory, and a second query
 * would cost another round trip for data the caller has.
 */
export async function getCollections(): Promise<string[]> {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("max");

  const products = await getProducts();
  return [...new Set(products.map((product) => product.product_collection).filter(Boolean))].sort();
}

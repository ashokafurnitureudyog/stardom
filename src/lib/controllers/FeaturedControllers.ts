"use server";

import { updateTag } from "next/cache";
import { Query } from "node-appwrite";
import { type ActionResult, authorized, failure } from "@/lib/server/action-result";
import { appwriteIds, createAdminClient } from "@/lib/server/appwrite";
import { FEATURED_TAG } from "@/lib/server/products";

/** The home grid has four slots. */
const MAX_FEATURED = 4;

function featuredTable() {
  const ids = appwriteIds();
  if (!ids.featured) throw new Error("Featured table is not configured");
  return { databaseId: ids.database, tableId: ids.featured };
}

/**
 * Marks a product as featured. The row carries the product's own id and nothing
 * else: the product is read fresh when the home page renders, so editing a
 * product cannot leave a stale copy on the front page.
 */
export async function addToFeatured(productId: string): Promise<ActionResult<{ id: string }>> {
  if (!productId) return failure("Product id is required");

  return authorized(async () => {
    const { tables } = await createAdminClient();
    const table = featuredTable();

    const current = await tables.listRows({
      ...table,
      queries: [Query.limit(MAX_FEATURED + 1), Query.select(["$id"])],
    });

    if (current.rows.some((row) => row.$id === productId)) {
      throw new Error("That product is already featured");
    }

    if (current.total >= MAX_FEATURED) {
      throw new Error(`Only ${MAX_FEATURED} products can be featured. Remove one first.`);
    }

    await tables.createRow({ ...table, rowId: productId, data: {} });

    updateTag(FEATURED_TAG);
    return { id: productId };
  });
}

export async function removeFromFeatured(productId: string): Promise<ActionResult<{ id: string }>> {
  if (!productId) return failure("Product id is required");

  return authorized(async () => {
    const { tables } = await createAdminClient();
    await tables.deleteRow({ ...featuredTable(), rowId: productId });

    updateTag(FEATURED_TAG);
    return { id: productId };
  });
}

"use server";

import { updateTag } from "next/cache";
import { ID } from "node-appwrite";
import { deleteFilesFromStorage } from "@/lib/actions/storage-actions";
import { type ActionResult, authorized, failure, guarded } from "@/lib/server/action-result";
import { appwriteIds, createAdminClient } from "@/lib/server/appwrite";
import { PRODUCTS_TAG } from "@/lib/server/products";
import { type ProductInput, productSchema } from "@/lib/validations/cms";

/**
 * The image/colour map is stored as JSON in a single column. It is only valid
 * if every value names one of the product's own colours; otherwise the gallery
 * filter on the product page shows nothing for that colour.
 */
function assertValidColorMapping(mapping: string | undefined, colors: string[]) {
  if (!mapping) return;

  let parsed: unknown;
  try {
    parsed = JSON.parse(mapping);
  } catch {
    throw new Error("Image colour mapping is not valid JSON");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Image colour mapping must map an image URL to a colour");
  }

  for (const [image, color] of Object.entries(parsed)) {
    if (typeof image !== "string" || typeof color !== "string" || !colors.includes(color)) {
      throw new Error("Image colour mapping references a colour that is not on this product");
    }
  }
}

function toRow(product: ProductInput) {
  return {
    name: product.name,
    description: product.description,
    category: product.category,
    product_collection: product.collection,
    features: product.features,
    colors: product.colors,
    images: product.images,
    image_color_mapping: product.imageColorMapping,
  };
}

export async function addProduct(input: unknown): Promise<ActionResult<{ id: string }>> {
  return guarded(productSchema, input, async (product) => {
    assertValidColorMapping(product.imageColorMapping, product.colors);

    const { tables } = await createAdminClient();
    const ids = appwriteIds();
    const row = await tables.createRow({
      databaseId: ids.database,
      tableId: ids.products,
      rowId: ID.unique(),
      data: toRow(product),
    });

    updateTag(PRODUCTS_TAG);
    return { id: row.$id };
  });
}

export async function updateProduct(
  productId: string,
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  if (!productId) return failure("Product id is required");

  return guarded(productSchema, input, async (product) => {
    assertValidColorMapping(product.imageColorMapping, product.colors);

    const { tables } = await createAdminClient();
    const ids = appwriteIds();

    if (product.removedImages?.length) {
      await deleteFilesFromStorage(product.removedImages, ids.productImages);
    }

    const row = await tables.updateRow({
      databaseId: ids.database,
      tableId: ids.products,
      rowId: productId,
      data: toRow(product),
    });

    updateTag(PRODUCTS_TAG);
    updateTag(`product-${productId}`);
    return { id: row.$id };
  });
}

export async function deleteProduct(
  productId: string,
  imageUrls: string[] = [],
): Promise<ActionResult<{ id: string }>> {
  if (!productId) return failure("Product id is required");

  return authorized(async () => {
    const { tables } = await createAdminClient();
    const ids = appwriteIds();

    if (imageUrls.length) await deleteFilesFromStorage(imageUrls, ids.productImages);

    if (ids.featured) {
      // A featured row carries its product's id, so removing the product has to
      // remove it from the home grid as well.
      await tables
        .deleteRow({ databaseId: ids.database, tableId: ids.featured, rowId: productId })
        .catch(() => undefined);
    }

    await tables.deleteRow({
      databaseId: ids.database,
      tableId: ids.products,
      rowId: productId,
    });

    updateTag(PRODUCTS_TAG);
    updateTag(`product-${productId}`);
    return { id: productId };
  });
}

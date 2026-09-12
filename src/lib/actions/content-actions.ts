"use server";

import { Query } from "node-appwrite";
import { appwriteIds, createAdminClient } from "@/lib/server/appwrite";
import {
  type CompanyData,
  getCompanyData,
  getHeroMedia,
  getPortfolioProjects,
  getTestimonials,
} from "@/lib/server/content";
import type { ClientTestimonial, PortfolioProject, Product } from "@/types/ComponentTypes";
import type { HeroMedia } from "@/types/MediaTypes";

/**
 * Read actions for the dashboard. The public site reads these caches directly
 * during render; the dashboard is interactive and reloads a section after it
 * changes something, which is what these are for.
 */

/** Products with every column, including the ones the storefront never needs. */
export async function loadProducts(): Promise<Product[]> {
  const { tables } = await createAdminClient();
  const ids = appwriteIds();
  const { rows } = await tables.listRows({
    databaseId: ids.database,
    tableId: ids.products,
    queries: [Query.limit(100), Query.orderDesc("$createdAt")],
  });

  return rows.map((row) => ({ ...row, id: row.$id }) as unknown as Product);
}

/** The ids currently marked as featured, in the order they were added. */
export async function loadFeaturedIds(): Promise<string[]> {
  const ids = appwriteIds();
  if (!ids.featured) return [];

  const { tables } = await createAdminClient();
  const { rows } = await tables.listRows({
    databaseId: ids.database,
    tableId: ids.featured,
    queries: [Query.limit(100), Query.orderAsc("$createdAt"), Query.select(["$id"])],
  });

  return rows.map((row) => row.$id);
}

export async function loadCompanyData(): Promise<CompanyData> {
  return getCompanyData();
}

export async function loadHeroMedia(): Promise<HeroMedia[]> {
  return getHeroMedia();
}

export async function loadTestimonials(): Promise<ClientTestimonial[]> {
  return getTestimonials();
}

export async function loadPortfolioProjects(): Promise<PortfolioProject[]> {
  return getPortfolioProjects();
}

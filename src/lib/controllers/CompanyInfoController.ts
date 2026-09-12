"use server";

import { updateTag } from "next/cache";
import { ID, Query } from "node-appwrite";
import { type ActionResult, guarded } from "@/lib/server/action-result";
import { appwriteIds, createAdminClient } from "@/lib/server/appwrite";
import { COMPANY_TAG } from "@/lib/server/content";
import {
  type CompanyInfoInput,
  companyInfoSchema,
  socialLinksSchema,
  teamMembersSchema,
} from "@/lib/validations/cms";

type Listed = { id?: string };

/**
 * Applies a list of rows to a table: existing rows are updated, new ones are
 * created, and rows the dashboard removed are deleted. Keeps the table in step
 * with what the form submitted instead of appending forever.
 */
async function syncRows<T extends Listed>(
  tableId: string,
  items: T[],
  toData: (item: T) => Record<string, unknown>,
) {
  const { tables } = await createAdminClient();
  const databaseId = appwriteIds().database;

  const existing = await tables.listRows({
    databaseId,
    tableId,
    queries: [Query.limit(100), Query.select(["$id"])],
  });

  const submittedIds = new Set(items.map((item) => item.id).filter(Boolean));
  const removed = existing.rows.filter((row) => !submittedIds.has(row.$id));

  await Promise.all([
    ...items.map((item) =>
      item.id
        ? tables.updateRow({ databaseId, tableId, rowId: item.id, data: toData(item) })
        : tables.createRow({ databaseId, tableId, rowId: ID.unique(), data: toData(item) }),
    ),
    ...removed.map((row) => tables.deleteRow({ databaseId, tableId, rowId: row.$id })),
  ]);
}

function toCompanyRow(data: CompanyInfoInput) {
  return {
    name: data.name,
    parentCompany: data.parentCompany,
    established: data.established,
    street: data.address.street,
    city: data.address.city,
    country: data.address.Country,
    zip: data.address.zip,
    latitude: data.address.coordinates[0],
    longitude: data.address.coordinates[1],
    weekdayHours: data.hours.weekday,
    sundayHours: data.hours.sunday,
    phone: data.phone,
    email: data.email,
    website: data.website,
    mapsLink: data.mapsLink,
  };
}

export async function updateCompanyInfo(input: unknown): Promise<ActionResult<{ id: string }>> {
  return guarded(companyInfoSchema, input, async (data) => {
    const { tables } = await createAdminClient();
    const ids = appwriteIds();
    if (!ids.companyInfo) throw new Error("Company info table is not configured");

    const existing = await tables.listRows({
      databaseId: ids.database,
      tableId: ids.companyInfo,
      queries: [Query.limit(1), Query.select(["$id"])],
    });

    const row = existing.rows[0]
      ? await tables.updateRow({
          databaseId: ids.database,
          tableId: ids.companyInfo,
          rowId: existing.rows[0].$id,
          data: toCompanyRow(data),
        })
      : await tables.createRow({
          databaseId: ids.database,
          tableId: ids.companyInfo,
          rowId: ID.unique(),
          data: toCompanyRow(data),
        });

    updateTag(COMPANY_TAG);
    return { id: row.$id };
  });
}

export async function updateSocialLinks(input: unknown): Promise<ActionResult<{ count: number }>> {
  return guarded(socialLinksSchema, input, async (links) => {
    const ids = appwriteIds();
    if (!ids.socialLinks) throw new Error("Social links table is not configured");

    await syncRows(ids.socialLinks, links, (link) => ({
      platform: link.platform,
      url: link.url,
    }));

    updateTag(COMPANY_TAG);
    return { count: links.length };
  });
}

export async function updateTeamMembers(input: unknown): Promise<ActionResult<{ count: number }>> {
  return guarded(teamMembersSchema, input, async (members) => {
    const ids = appwriteIds();
    if (!ids.teamMembers) throw new Error("Team members table is not configured");

    await syncRows(ids.teamMembers, members, (member) => ({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
    }));

    updateTag(COMPANY_TAG);
    return { count: members.length };
  });
}

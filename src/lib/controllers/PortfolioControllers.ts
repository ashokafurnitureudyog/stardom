"use server";

import { updateTag } from "next/cache";
import { ID } from "node-appwrite";
import { deleteFilesFromStorage } from "@/lib/actions/storage-actions";
import { type ActionResult, authorized, failure, guarded } from "@/lib/server/action-result";
import { appwriteIds, createAdminClient } from "@/lib/server/appwrite";
import { PORTFOLIO_TAG } from "@/lib/server/content";
import { type PortfolioProjectInput, portfolioProjectSchema } from "@/lib/validations/cms";

function portfolioTable() {
  const ids = appwriteIds();
  if (!ids.portfolio) throw new Error("Portfolio table is not configured");
  return { databaseId: ids.database, tableId: ids.portfolio };
}

function toRow(project: PortfolioProjectInput) {
  return {
    title: project.title,
    tags: project.tags,
    thumbnail: project.thumbnail || "",
    description: project.description,
    challenge: project.challenge,
    solution: project.solution,
    impact: project.impact,
    testimonial_quote: project.testimonial_quote || "",
    testimonial_author: project.testimonial_author || "",
    testimonial_position: project.testimonial_position || "",
    gallery: project.gallery,
  };
}

export async function createPortfolioProject(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  return guarded(portfolioProjectSchema, input, async (project) => {
    const { tables } = await createAdminClient();
    const row = await tables.createRow({
      ...portfolioTable(),
      rowId: ID.unique(),
      data: toRow(project),
    });

    updateTag(PORTFOLIO_TAG);
    return { id: row.$id };
  });
}

export async function updatePortfolioProject(
  projectId: string,
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  if (!projectId) return failure("Project id is required");

  return guarded(portfolioProjectSchema, input, async (project) => {
    const { tables } = await createAdminClient();

    if (project.removedImages?.length) {
      await deleteFilesFromStorage(project.removedImages);
    }

    const row = await tables.updateRow({
      ...portfolioTable(),
      rowId: projectId,
      data: toRow(project),
    });

    updateTag(PORTFOLIO_TAG);
    return { id: row.$id };
  });
}

export async function deletePortfolioProject(
  projectId: string,
  imageUrls: string[] = [],
): Promise<ActionResult<{ id: string }>> {
  if (!projectId) return failure("Project id is required");

  return authorized(async () => {
    const { tables } = await createAdminClient();

    if (imageUrls.length) await deleteFilesFromStorage(imageUrls);
    await tables.deleteRow({ ...portfolioTable(), rowId: projectId });

    updateTag(PORTFOLIO_TAG);
    return { id: projectId };
  });
}

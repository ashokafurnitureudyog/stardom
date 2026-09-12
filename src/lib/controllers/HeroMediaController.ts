"use server";

import { updateTag } from "next/cache";
import { ID } from "node-appwrite";
import { deleteFilesFromStorage } from "@/lib/actions/storage-actions";
import { type ActionResult, authorized, failure, guarded } from "@/lib/server/action-result";
import { appwriteIds, createAdminClient } from "@/lib/server/appwrite";
import { HERO_MEDIA_TAG } from "@/lib/server/content";
import { heroMediaSchema } from "@/lib/validations/cms";

function heroMediaTable() {
  const ids = appwriteIds();
  if (!ids.heroMedia) throw new Error("Hero media table is not configured");
  return { databaseId: ids.database, tableId: ids.heroMedia };
}

export async function addHeroMedia(input: unknown): Promise<ActionResult<{ id: string }>> {
  return guarded(heroMediaSchema, input, async (media) => {
    const { tables } = await createAdminClient();
    const row = await tables.createRow({
      ...heroMediaTable(),
      rowId: ID.unique(),
      data: {
        type: media.type,
        src: media.src,
        alt: media.alt || "",
        poster: media.poster || "",
        preload: media.preload ?? false,
        webmSrc: media.webmSrc || "",
        lowResSrc: media.lowResSrc || "",
      },
    });

    updateTag(HERO_MEDIA_TAG);
    return { id: row.$id };
  });
}

export async function deleteHeroMedia(id: string): Promise<ActionResult<{ id: string }>> {
  if (!id) return failure("Media id is required");

  return authorized(async () => {
    const { tables } = await createAdminClient();
    const table = heroMediaTable();

    const media = await tables.getRow({ ...table, rowId: id });
    const files = [media.src, media.poster, media.webmSrc, media.lowResSrc].filter(
      (value): value is string => typeof value === "string" && value.length > 0,
    );

    await deleteFilesFromStorage(files);
    await tables.deleteRow({ ...table, rowId: id });

    updateTag(HERO_MEDIA_TAG);
    return { id };
  });
}

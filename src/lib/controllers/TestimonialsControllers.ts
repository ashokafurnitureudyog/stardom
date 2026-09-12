"use server";

import { updateTag } from "next/cache";
import { ID } from "node-appwrite";
import { deleteFilesFromStorage } from "@/lib/actions/storage-actions";
import { type ActionResult, authorized, failure, guarded } from "@/lib/server/action-result";
import { appwriteIds, createAdminClient } from "@/lib/server/appwrite";
import { TESTIMONIALS_TAG } from "@/lib/server/content";
import { type TestimonialInput, testimonialSchema } from "@/lib/validations/cms";

function toRow(testimonial: TestimonialInput) {
  return {
    name: testimonial.name,
    title: testimonial.title,
    location: testimonial.location,
    context: testimonial.context || "",
    purchaseDate: testimonial.purchaseDate || "",
    verified: testimonial.verified ?? true,
    quote: testimonial.quote,
    img: testimonial.img || "",
  };
}

function testimonialsTable() {
  const ids = appwriteIds();
  if (!ids.testimonials) throw new Error("Testimonials table is not configured");
  return { databaseId: ids.database, tableId: ids.testimonials };
}

export async function createTestimonial(input: unknown): Promise<ActionResult<{ id: string }>> {
  return guarded(testimonialSchema, input, async (testimonial) => {
    const { tables } = await createAdminClient();
    const row = await tables.createRow({
      ...testimonialsTable(),
      rowId: ID.unique(),
      data: toRow(testimonial),
    });

    updateTag(TESTIMONIALS_TAG);
    return { id: row.$id };
  });
}

export async function updateTestimonial(
  testimonialId: string,
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  if (!testimonialId) return failure("Testimonial id is required");

  return guarded(testimonialSchema, input, async (testimonial) => {
    const { tables } = await createAdminClient();
    const row = await tables.updateRow({
      ...testimonialsTable(),
      rowId: testimonialId,
      data: toRow(testimonial),
    });

    updateTag(TESTIMONIALS_TAG);
    return { id: row.$id };
  });
}

export async function deleteTestimonial(
  testimonialId: string,
  imageUrl?: string,
): Promise<ActionResult<{ id: string }>> {
  if (!testimonialId) return failure("Testimonial id is required");

  return authorized(async () => {
    const { tables } = await createAdminClient();

    if (imageUrl) await deleteFilesFromStorage([imageUrl]);
    await tables.deleteRow({ ...testimonialsTable(), rowId: testimonialId });

    updateTag(TESTIMONIALS_TAG);
    return { id: testimonialId };
  });
}

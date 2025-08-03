import { NextRequest, NextResponse } from "next/server";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "@/lib/controllers/TestimonialsControllers";
import { apiHandler, parseRequestFormData } from "@/lib/utils/api-utils";

export async function POST(request: NextRequest) {
  return apiHandler(request, async (req) => {
    // Parse FormData
    const formData = await parseRequestFormData(req);

    // Check if this is an update (editing an existing testimonial)
    const id = formData.get("id");

    if (id) {
      // This is an update operation
      const result = await updateTestimonial(formData);

      if (!result.success) {
        return NextResponse.json({ message: result.error }, { status: 500 });
      }

      return result.data;
    } else {
      // This is a create operation
      const result = await createTestimonial(formData);

      if (!result.success) {
        return NextResponse.json({ message: result.error }, { status: 500 });
      }

      return result.data;
    }
  });
}

export async function DELETE(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const { testimonialId, id } = await req.json();

    // Use either testimonialId or id (depending on what's provided)
    const documentId = testimonialId || id;

    if (!documentId) {
      return NextResponse.json(
        { message: "Testimonial ID is required" },
        { status: 400 },
      );
    }

    const result = await deleteTestimonial(documentId);

    if (!result.success) {
      throw new Error(result.error);
    }

    return { message: "Testimonial deleted successfully" };
  });
}

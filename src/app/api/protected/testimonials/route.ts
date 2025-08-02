import { NextRequest, NextResponse } from "next/server";
import {
  createTestimonial,
  deleteTestimonial,
} from "@/lib/controllers/TestimonialsControllers";
import { apiHandler, parseRequestFormData } from "@/lib/utils/api-utils";

export async function POST(request: NextRequest) {
  return apiHandler(request, async (req) => {
    // Parse FormData
    const formData = await parseRequestFormData(req);

    const result = await createTestimonial(formData);

    if (!result.success) {
      return NextResponse.json({ message: result.error }, { status: 500 });
    }

    return result.data;
  });
}

export async function DELETE(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const { testimonialId } = await req.json();

    if (!testimonialId) {
      return NextResponse.json(
        { message: "Testimonial ID is required" },
        { status: 400 },
      );
    }

    const result = await deleteTestimonial(testimonialId);

    if (!result.success) {
      throw new Error(result.error);
    }

    return { message: "Testimonial deleted successfully" };
  });
}

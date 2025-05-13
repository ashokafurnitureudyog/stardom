/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import {
  createTestimonial,
  deleteTestimonial,
} from "@/lib/controllers/TestimonialsControllers";
import { createSessionClient } from "@/lib/server/appwrite";

export async function POST(request: NextRequest) {
  try {
    // Verify session and permissions
    try {
      await createSessionClient();
    } catch (error) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    // Parse FormData instead of JSON
    const formData = await request.formData();

    const result = await createTestimonial(formData);

    if (!result.success) {
      return NextResponse.json({ message: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create testimonial:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create testimonial" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify session and permissions
    try {
      await createSessionClient();
    } catch (error) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const { testimonialId } = await request.json();

    if (!testimonialId) {
      return NextResponse.json(
        { message: "Testimonial ID is required" },
        { status: 400 },
      );
    }

    const result = await deleteTestimonial(testimonialId);

    if (!result.success) {
      return NextResponse.json({ message: result.error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Testimonial deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Failed to delete testimonial:", error);
    return NextResponse.json(
      { message: error.message || "Failed to delete testimonial" },
      { status: 500 },
    );
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";
import {
  createPortfolioProject,
  deletePortfolioProject,
} from "@/lib/controllers/PortfolioControllers";

export async function POST(request: NextRequest) {
  try {
    // Verify session and permissions
    try {
      await createSessionClient();
    } catch (error) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    // Parse FormData
    const formData = await request.formData();

    // Extract project data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const challenge = formData.get("challenge") as string;
    const solution = formData.get("solution") as string;
    const impact = formData.get("impact") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const thumbnail = formData.get("thumbnail") as string;
    const gallery = JSON.parse((formData.get("gallery") as string) || "[]");

    // Extract testimonial data (as separate fields now)
    const testimonial_quote = formData.get("testimonial_quote") as string;
    const testimonial_author = formData.get("testimonial_author") as string;
    const testimonial_position = formData.get("testimonial_position") as string;

    // Extract files
    const files = formData
      .getAll("files")
      .filter((item) => item instanceof File) as File[];

    const projectData = {
      title,
      description,
      challenge,
      solution,
      impact,
      tags,
      thumbnail,
      gallery,
      testimonial_quote,
      testimonial_author,
      testimonial_position,
    };

    const result = await createPortfolioProject(projectData, files);

    if (!result.success) {
      return NextResponse.json({ message: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create portfolio project:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create portfolio project" },
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

    const { projectId, imageUrls } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 },
      );
    }

    const result = await deletePortfolioProject(
      projectId,
      Array.isArray(imageUrls) ? imageUrls : [],
    );

    if (!result.success) {
      return NextResponse.json({ message: result.error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Portfolio project deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Failed to delete portfolio project:", error);
    return NextResponse.json(
      { message: error.message || "Failed to delete portfolio project" },
      { status: 500 },
    );
  }
}

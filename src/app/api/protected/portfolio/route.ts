import { NextRequest, NextResponse } from "next/server";
import {
  createPortfolioProject,
  deletePortfolioProject,
  updatePortfolioProject,
} from "@/lib/controllers/PortfolioControllers";
import { apiHandler, parseRequestFormData } from "@/lib/utils/api-utils";

export async function POST(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const formData = await parseRequestFormData(req);

    // Extract project data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const challenge = formData.get("challenge") as string;
    const solution = formData.get("solution") as string;
    const impact = formData.get("impact") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const thumbnail = formData.get("thumbnail") as string;
    const gallery = JSON.parse((formData.get("gallery") as string) || "[]");

    const testimonial_quote = formData.get("testimonial_quote") as string;
    const testimonial_author = formData.get("testimonial_author") as string;
    const testimonial_position = formData.get("testimonial_position") as string;

    const files = formData
      .getAll("files")
      .filter((item) => item instanceof File) as File[];

    const thumbnailFile = formData.get("thumbnailFile") as File | null;

    // Check if this is an update or create
    const projectId = formData.get("id") as string | null;

    // For updates
    const thumbnailRemoved = formData.get("thumbnail_removed") === "true";
    const removedGalleryUrlsStr = formData.get("removed_gallery_urls") as
      | string
      | null;
    const removedGalleryUrls = removedGalleryUrlsStr
      ? JSON.parse(removedGalleryUrlsStr)
      : [];

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

    let result;

    if (projectId) {
      // Update existing project
      result = await updatePortfolioProject(
        projectId,
        projectData,
        files,
        thumbnailFile || undefined,
        thumbnailRemoved,
        removedGalleryUrls,
      );
    } else {
      // Create new project
      result = await createPortfolioProject(
        projectData,
        files,
        thumbnailFile || undefined,
      );
    }

    if (!result.success) {
      return NextResponse.json({ message: result.error }, { status: 500 });
    }

    return result.data;
  });
}

export async function DELETE(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const { projectId, imageUrls } = await req.json();

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
      throw new Error(result.error);
    }

    return { message: "Portfolio project deleted successfully" };
  });
}

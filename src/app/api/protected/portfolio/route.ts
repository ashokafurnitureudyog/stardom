import { NextRequest, NextResponse } from "next/server";
import {
  createPortfolioProject,
  deletePortfolioProject,
  updatePortfolioProject,
} from "@/lib/controllers/PortfolioControllers";
import { apiHandler } from "@/lib/utils/api-utils";

export async function POST(request: NextRequest) {
  return apiHandler(request, async (req) => {
    // Parse JSON data
    const projectData = await req.json();

    // Check if this is an update (editing an existing project)
    if (projectData.id) {
      // This is an update operation
      const result = await updatePortfolioProject(
        projectData.id,
        {
          title: projectData.title,
          description: projectData.description,
          challenge: projectData.challenge || "",
          solution: projectData.solution || "",
          impact: projectData.impact || "",
          tags: projectData.tags || [],
          thumbnail: projectData.thumbnail || "",
          gallery: projectData.gallery || [],
          testimonial_quote: projectData.testimonial_quote || "",
          testimonial_author: projectData.testimonial_author || "",
          testimonial_position: projectData.testimonial_position || "",
        },
        undefined, // No files - uploaded directly
        undefined, // No thumbnail file - uploaded directly
        projectData.thumbnailRemoved || false,
        projectData.removedGalleryUrls || [],
      );

      if (!result.success) {
        return NextResponse.json({ message: result.error }, { status: 500 });
      }

      return result.data;
    } else {
      // This is a create operation
      const result = await createPortfolioProject(
        {
          title: projectData.title,
          description: projectData.description,
          challenge: projectData.challenge || "",
          solution: projectData.solution || "",
          impact: projectData.impact || "",
          tags: projectData.tags || [],
          thumbnail: projectData.thumbnail || "",
          gallery: projectData.gallery || [],
          testimonial_quote: projectData.testimonial_quote || "",
          testimonial_author: projectData.testimonial_author || "",
          testimonial_position: projectData.testimonial_position || "",
        },
        undefined, // No files - uploaded directly
        undefined, // No thumbnail file - uploaded directly
      );

      if (!result.success) {
        return NextResponse.json({ message: result.error }, { status: 500 });
      }

      return result.data;
    }
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

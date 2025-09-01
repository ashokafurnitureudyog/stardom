import { NextRequest, NextResponse } from "next/server";
import {
  addHeroMedia,
  deleteHeroMedia,
} from "@/lib/controllers/HeroMediaController";
import { apiHandler } from "@/lib/utils/api-utils";

export async function POST(request: NextRequest) {
  return apiHandler(request, async (req) => {
    // Parse JSON data
    const data = await req.json();

    if (!data.type || !data.src) {
      return NextResponse.json(
        { error: "Media type and source URL are required" },
        { status: 400 },
      );
    }

    const result = await addHeroMedia({
      type: data.type,
      src: data.src,
      alt: data.alt || "",
      poster: data.poster || "",
      preload: data.preload || false,
      webmSrc: data.webmSrc || "",
      lowResSrc: data.lowResSrc || "",
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    return result;
  });
}

export async function DELETE(request: NextRequest) {
  try {
    // Get the ID from the URL params
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id || id === "undefined" || id === "null") {
      return NextResponse.json(
        {
          success: false,
          error: "Valid ID is required for deletion",
        },
        { status: 400 },
      );
    }

    const result = await deleteHeroMedia(id);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to delete media item",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Hero media deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Error deleting hero media:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      {
        success: false,
        error: "Server error occurred while processing deletion request",
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import {
  addHeroMediaUrl,
  uploadHeroMedia,
  deleteHeroMedia,
} from "@/lib/controllers/HeroMediaController";
import { apiHandler, parseRequestFormData } from "@/lib/utils/api-utils";

export async function POST(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const formData = await parseRequestFormData(req);
    const method = formData.get("method")?.toString();

    let result;

    switch (method) {
      case "url": {
        const dataString = formData.get("data")?.toString();
        if (!dataString) {
          return NextResponse.json(
            { error: "No data provided" },
            { status: 400 },
          );
        }
        const data = JSON.parse(dataString);
        result = await addHeroMediaUrl(data);
        break;
      }

      case "upload": {
        const file = formData.get("file") as File;
        const type = formData.get("type")?.toString() as "image" | "video";
        const alt = formData.get("alt")?.toString();

        if (!file) {
          return NextResponse.json(
            { error: "No file provided" },
            { status: 400 },
          );
        }

        if (!type) {
          return NextResponse.json(
            { error: "Media type is required" },
            { status: 400 },
          );
        }

        result = await uploadHeroMedia(file, type, alt);
        break;
      }

      default:
        return NextResponse.json({ error: "Invalid method" }, { status: 400 });
    }

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

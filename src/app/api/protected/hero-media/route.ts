/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/server/appwrite";
import {
  getHeroMedia,
  addHeroMediaUrl,
  uploadHeroMedia,
  deleteHeroMedia,
} from "@/lib/controllers/HeroMediaController";

export async function GET() {
  try {
    // Verify user is logged in
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await getHeroMedia();

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching hero media:", error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify user is logged in
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
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
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error adding hero media:", error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify user is logged in
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the ID from the URL params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    const result = await deleteHeroMedia(id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Hero media deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting hero media:", error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { getPublicHeroMedia } from "@/lib/controllers/HeroMediaController";

export async function GET() {
  try {
    const result = await getPublicHeroMedia();

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      mediaItems: result.mediaItems,
    });
  } catch (error: unknown) {
    console.error("Error fetching hero media:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

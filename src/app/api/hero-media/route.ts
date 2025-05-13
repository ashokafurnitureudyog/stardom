/* eslint-disable @typescript-eslint/no-explicit-any */
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
  } catch (error: any) {
    console.error("Error fetching hero media:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

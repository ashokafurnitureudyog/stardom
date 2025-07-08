import { NextResponse } from "next/server";
import { getCompanyInfo } from "@/lib/controllers/CompanyInfoController";

export async function GET() {
  try {
    const result = await getCompanyInfo();

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Just return the social links with platform names, don't attach icon components
    return NextResponse.json({
      companyInfo: result.companyInfo,
      socialLinks: result.socialLinks, // Make sure these objects have a "platform" property
      teamMembers: result.teamMembers,
    });
  } catch (error: unknown) {
    console.error("Error fetching company info:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

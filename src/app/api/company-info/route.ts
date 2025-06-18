import { NextResponse } from "next/server";
import { getCompanyInfo } from "@/lib/controllers/CompanyInfoController";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { RiTwitterXFill } from "@remixicon/react";

// Map platform names to icons
const platformIcons: Record<string, React.ComponentType> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: RiTwitterXFill, // Using Remix Icon for X
  x: RiTwitterXFill, // Added for new links using "x" directly
  youtube: Youtube,
};

// Rest of the code remains the same
export async function GET() {
  try {
    const result = await getCompanyInfo();

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Add icon components based on platform name
    const socialLinksWithIcons = result.socialLinks.map((link) => ({
      ...link,
      icon: platformIcons[link.platform.toLowerCase()] || null,
    }));

    return NextResponse.json({
      companyInfo: result.companyInfo,
      socialLinks: socialLinksWithIcons,
      teamMembers: result.teamMembers,
    });
  } catch (error: unknown) {
    console.error("Error fetching company info:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

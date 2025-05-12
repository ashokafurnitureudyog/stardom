/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getCompanyInfo } from "@/lib/controllers/CompanyInfoController";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

// Map platform names to icons
const platformIcons: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
};

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
  } catch (error: any) {
    console.error("Error fetching company info:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

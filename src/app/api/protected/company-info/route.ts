/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/server/appwrite";
import {
  getCompanyInfo,
  updateCompanyInfo,
  updateSocialLinks,
  updateTeamMembers,
  uploadTeamImage,
  deleteCompanyInfo,
} from "@/lib/controllers/CompanyInfoController";

export async function GET() {
  try {
    // Verify user is logged in
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await getCompanyInfo();

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching company info:", error);
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
    const section = formData.get("section")?.toString();

    let result;

    switch (section) {
      case "basic": {
        const dataString = formData.get("data")?.toString();
        if (!dataString) {
          return NextResponse.json(
            { error: "No data provided" },
            { status: 400 },
          );
        }
        const data = JSON.parse(dataString);
        result = await updateCompanyInfo(data);
        break;
      }

      case "social": {
        const dataString = formData.get("data")?.toString();
        if (!dataString) {
          return NextResponse.json(
            { error: "No data provided" },
            { status: 400 },
          );
        }
        const data = JSON.parse(dataString);
        result = await updateSocialLinks(data);
        break;
      }

      case "team": {
        const dataString = formData.get("data")?.toString();
        if (!dataString) {
          return NextResponse.json(
            { error: "No data provided" },
            { status: 400 },
          );
        }
        const data = JSON.parse(dataString);
        result = await updateTeamMembers(data);
        break;
      }

      case "image-upload": {
        const file = formData.get("file") as File;

        if (!file) {
          return NextResponse.json(
            { error: "No file provided" },
            { status: 400 },
          );
        }

        result = await uploadTeamImage(file);
        break;
      }

      default:
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error updating company info:", error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    // Verify user is logged in
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await deleteCompanyInfo();

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Company information deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting company info:", error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 },
    );
  }
}

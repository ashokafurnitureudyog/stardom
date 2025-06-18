import { NextRequest, NextResponse } from "next/server";
import {
  getCompanyInfo,
  updateCompanyInfo,
  updateSocialLinks,
  updateTeamMembers,
  uploadTeamImage,
  deleteCompanyInfo,
} from "@/lib/controllers/CompanyInfoController";
import { apiHandler, parseRequestFormData } from "@/lib/utils/api-utils";

export async function GET(request: NextRequest) {
  return apiHandler(request, async () => {
    const result = await getCompanyInfo();

    if (!result.success) {
      throw new Error(result.error);
    }

    return result;
  });
}

export async function POST(request: NextRequest) {
  return apiHandler(request, async (req) => {
    const formData = await parseRequestFormData(req);
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
      throw new Error(result.error);
    }

    return result;
  });
}

export async function DELETE() {
  return apiHandler({} as NextRequest, async () => {
    const result = await deleteCompanyInfo();

    if (!result.success) {
      throw new Error(result.error);
    }

    return {
      success: true,
      message: "Company information deleted successfully",
    };
  });
}

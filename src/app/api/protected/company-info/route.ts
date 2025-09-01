import { NextRequest, NextResponse } from "next/server";
import {
  getCompanyInfo,
  updateCompanyInfo,
  updateSocialLinks,
  updateTeamMembers,
  deleteCompanyInfo,
} from "@/lib/controllers/CompanyInfoController";
import { apiHandler } from "@/lib/utils/api-utils";

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
    // Check content type to determine how to parse the request
    const contentType = req.headers.get("content-type") || "";

    // If content type is JSON, parse as JSON
    if (contentType.includes("application/json")) {
      const data = await req.json();
      const { section } = data;

      let result;

      switch (section) {
        case "basic":
          result = await updateCompanyInfo(data.companyInfo);
          break;

        case "social":
          result = await updateSocialLinks(data.links);
          break;

        case "team":
          result = await updateTeamMembers(data.members);
          break;

        default:
          return NextResponse.json(
            { error: "Invalid section" },
            { status: 400 },
          );
      }

      if (!result.success) {
        throw new Error(result.error);
      }

      return result;
    }
    // Otherwise parse as FormData (for backward compatibility)
    else {
      const formData = await req.formData();
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

        default:
          return NextResponse.json(
            { error: "Invalid section" },
            { status: 400 },
          );
      }

      if (!result.success) {
        throw new Error(result.error);
      }

      return result;
    }
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

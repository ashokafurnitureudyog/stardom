"use server";
import { ID } from "node-appwrite";
import { CompanyInfo, TeamMember } from "@/types/ComponentTypes";
import { createAdminClient, getLoggedInUser } from "../server/appwrite";

// Get company info
export async function getCompanyInfo() {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;

    // Get basic company info
    const companyInfoCollection =
      process.env.APPWRITE_COMPANY_INFO_COLLECTION_ID!;
    const companyInfoData = await database.listDocuments(
      databaseId,
      companyInfoCollection,
    );

    // Get social links
    const socialLinksCollection =
      process.env.APPWRITE_SOCIAL_LINKS_COLLECTION_ID!;
    const socialLinksData = await database.listDocuments(
      databaseId,
      socialLinksCollection,
    );

    // Get team members
    const teamMembersCollection =
      process.env.APPWRITE_TEAM_MEMBERS_COLLECTION_ID!;
    const teamMembersData = await database.listDocuments(
      databaseId,
      teamMembersCollection,
    );

    // Format company info to match your data structure
    let companyInfo = null;
    if (companyInfoData.documents.length > 0) {
      const doc = companyInfoData.documents[0];
      companyInfo = {
        name: doc.name,
        parentCompany: doc.parentCompany,
        established: doc.established,
        address: {
          street: doc.street,
          city: doc.city,
          Country: doc.country,
          zip: doc.zip,
          coordinates: [doc.latitude, doc.longitude] as [number, number],
        },
        hours: {
          weekday: doc.weekdayHours,
          sunday: doc.sundayHours,
        },
        phone: doc.phone,
        email: doc.email,
        website: doc.website,
        mapsLink: doc.mapsLink,
      };
    }

    // Format social links
    const socialLinks = socialLinksData.documents.map((doc) => ({
      id: doc.$id,
      platform: doc.platform,
      url: doc.url,
    }));

    // Format team members
    const teamMembers = teamMembersData.documents.map((doc) => ({
      id: doc.$id,
      name: doc.name,
      role: doc.role,
      bio: doc.bio,
      image: doc.image,
    }));

    return {
      success: true,
      companyInfo,
      socialLinks,
      teamMembers,
    };
  } catch (error) {
    console.error("Failed to fetch company info:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch company info",
      companyInfo: null,
      socialLinks: [],
      teamMembers: [],
    };
  }
}

// ...

export async function updateCompanyInfo(data: CompanyInfo) {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const { database } = await createAdminClient();
    // ...
    return {
      success: true,
      message: "Company info updated successfully",
    };
  } catch (error) {
    console.error("Failed to update company info:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update company info",
    };
  }
}

// Update social links
export async function updateSocialLinks(
  links: { platform: string; url: string; id?: string }[],
) {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const { database } = await createAdminClient();
    // ...
    return {
      success: true,
      message: "Social links updated successfully",
    };
  } catch (error) {
    console.error("Failed to update social links:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update social links",
    };
  }
}

// Update team members
export async function updateTeamMembers(members: TeamMember[]) {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const { database, storage } = await createAdminClient();
    // ...
    return {
      success: true,
      message: "Team members updated successfully",
    };
  } catch (error) {
    console.error("Failed to update team members:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update team members",
    };
  }
}

// Delete all company info
export async function deleteCompanyInfo() {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const { database, storage } = await createAdminClient();
    // ...
    return {
      success: true,
      message: "All company information deleted successfully",
    };
  } catch (error) {
    console.error("Failed to delete company info:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete company information",
    };
  }
}

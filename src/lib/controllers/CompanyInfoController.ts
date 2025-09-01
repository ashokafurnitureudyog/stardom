"use server";
import { ID } from "node-appwrite";
import { CompanyInfo, TeamMember } from "@/types/ComponentTypes";
import { createAdminClient } from "../server/appwrite";

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
  } catch (error: unknown) {
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

// Update company info
export async function updateCompanyInfo(data: CompanyInfo) {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_COMPANY_INFO_COLLECTION_ID!;

    // Check if there's an existing record
    const existingData = await database.listDocuments(databaseId, collectionId);

    // Document ID - use existing or create new
    const documentId =
      existingData.documents.length > 0
        ? existingData.documents[0].$id
        : ID.unique();

    // Create or update the document
    const method =
      existingData.documents.length > 0 ? "updateDocument" : "createDocument";

    // Create document data in the format the database expects
    const documentData = {
      name: data.name,
      parentCompany: data.parentCompany,
      established: data.established,
      street: data.address.street,
      city: data.address.city,
      country: data.address.Country,
      zip: data.address.zip,
      latitude: data.address.coordinates[0],
      longitude: data.address.coordinates[1],
      weekdayHours: data.hours.weekday,
      sundayHours: data.hours.sunday,
      phone: data.phone,
      email: data.email,
      website: data.website,
      mapsLink: data.mapsLink,
    };

    await database[method](databaseId, collectionId, documentId, documentData);

    return {
      success: true,
      message: "Company info updated successfully",
    };
  } catch (error: unknown) {
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
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_SOCIAL_LINKS_COLLECTION_ID!;

    // Get existing links
    const existingLinks = await database.listDocuments(
      databaseId,
      collectionId,
    );

    // Create maps for quick lookups
    const existingLinksById = new Map(
      existingLinks.documents.map((doc) => [doc.$id, doc]),
    );
    const existingLinksByPlatform = new Map(
      existingLinks.documents.map((doc) => [doc.platform, doc.$id]),
    );

    // Process each link
    for (const link of links) {
      // If link has an ID and it exists, update it
      if (link.id && existingLinksById.has(link.id)) {
        await database.updateDocument(databaseId, collectionId, link.id, {
          platform: link.platform,
          url: link.url,
        });
      }
      // If link doesn't have ID but platform exists, update that entry
      else if (existingLinksByPlatform.has(link.platform)) {
        const docId = existingLinksByPlatform.get(link.platform);
        await database.updateDocument(databaseId, collectionId, docId!, {
          platform: link.platform,
          url: link.url,
        });
      }
      // Otherwise create a new link
      else {
        await database.createDocument(databaseId, collectionId, ID.unique(), {
          platform: link.platform,
          url: link.url,
        });
      }
    }

    // Delete platforms that are no longer needed
    const newPlatforms = new Set(links.map((link) => link.platform));
    for (const doc of existingLinks.documents) {
      if (!newPlatforms.has(doc.platform)) {
        await database.deleteDocument(databaseId, collectionId, doc.$id);
      }
    }

    return {
      success: true,
      message: "Social links updated successfully",
    };
  } catch (error: unknown) {
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
    const { database, storage } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_TEAM_MEMBERS_COLLECTION_ID!;
    const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!; // Use existing bucket

    // Get existing members
    const existingMembers = await database.listDocuments(
      databaseId,
      collectionId,
    );

    // Collect images to delete
    const imagesToKeep = new Set(members.map((member) => member.image));
    const imagesToDelete = [];

    // Find images that need to be deleted (no longer referenced)
    for (const doc of existingMembers.documents) {
      // Only consider Appwrite hosted images
      if (
        doc.image.includes("appwrite.io") &&
        doc.image.includes("/files/") &&
        !imagesToKeep.has(doc.image)
      ) {
        imagesToDelete.push(doc.image);
      }
    }

    // Delete unreferenced images from storage
    for (const imageUrl of imagesToDelete) {
      try {
        // Parse file ID from URL
        const fileId = imageUrl.split("/files/")[1]?.split("/view")[0];
        if (fileId) {
          await storage.deleteFile(bucketId, fileId);
        }
      } catch (error) {
        console.error("Failed to delete image:", error);
        // Continue even if deletion fails
      }
    }

    // Delete all existing team member documents
    for (const doc of existingMembers.documents) {
      await database.deleteDocument(databaseId, collectionId, doc.$id);
    }

    // Create new team members
    for (const member of members) {
      await database.createDocument(databaseId, collectionId, ID.unique(), {
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: member.image,
      });
    }

    return {
      success: true,
      message: "Team members updated successfully",
    };
  } catch (error: unknown) {
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
    const { database, storage } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!;

    // Get collection IDs from environment variables
    const companyInfoCollection =
      process.env.APPWRITE_COMPANY_INFO_COLLECTION_ID!;
    const socialLinksCollection =
      process.env.APPWRITE_SOCIAL_LINKS_COLLECTION_ID!;
    const teamMembersCollection =
      process.env.APPWRITE_TEAM_MEMBERS_COLLECTION_ID!;

    // Check if collections exist
    if (
      !companyInfoCollection ||
      !socialLinksCollection ||
      !teamMembersCollection
    ) {
      return {
        success: false,
        error: "Collection IDs not configured",
      };
    }

    // Get team members to find images to delete
    const teamMembersDocs = await database.listDocuments(
      databaseId,
      teamMembersCollection,
    );

    // Delete team member images from storage
    for (const doc of teamMembersDocs.documents) {
      if (
        doc.image &&
        doc.image.includes("appwrite.io") &&
        doc.image.includes("/files/")
      ) {
        try {
          // Parse file ID from URL
          const fileId = doc.image.split("/files/")[1]?.split("/view")[0];
          if (fileId) {
            await storage.deleteFile(bucketId, fileId);
          }
        } catch (error) {
          console.error("Failed to delete image:", error);
          // Continue even if deletion fails
        }
      }
    }

    // Delete all documents in company info collection
    const companyInfoDocs = await database.listDocuments(
      databaseId,
      companyInfoCollection,
    );
    for (const doc of companyInfoDocs.documents) {
      await database.deleteDocument(databaseId, companyInfoCollection, doc.$id);
    }

    // Delete all documents in social links collection
    const socialLinksDocs = await database.listDocuments(
      databaseId,
      socialLinksCollection,
    );
    for (const doc of socialLinksDocs.documents) {
      await database.deleteDocument(databaseId, socialLinksCollection, doc.$id);
    }

    // Delete all documents in team members collection
    for (const doc of teamMembersDocs.documents) {
      await database.deleteDocument(databaseId, teamMembersCollection, doc.$id);
    }

    return {
      success: true,
      message: "All company information deleted successfully",
    };
  } catch (error: unknown) {
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

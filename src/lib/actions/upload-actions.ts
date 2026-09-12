"use server";

import { Client, Users } from "node-appwrite";
import { getLoggedInUser } from "@/lib/server/appwrite";

const TOKEN_TTL_SECONDS = 900;

export interface UploadCredentials {
  endpoint: string;
  project: string;
  jwt: string;
  expiresAt: number;
}

/**
 * Mints a short-lived JWT for the signed-in admin so the browser can upload
 * straight to Appwrite storage.
 *
 * Large files cannot be proxied through a Next route handler: the platform caps
 * a request body at a few megabytes, well under the 50 MB bucket limit, and
 * streaming a video through the server would pay for the bytes twice. Uploading
 * from the browser is the right shape. What it must not require is an open
 * bucket, so the browser gets the admin's own credentials for fifteen minutes
 * instead of the bucket being left writable by anyone.
 */
export async function createUploadCredentials(): Promise<UploadCredentials> {
  const user = await getLoggedInUser();
  if (!user) throw new Error("Unauthorized");

  const endpoint = process.env.APPWRITE_ENDPOINT;
  const project = process.env.APPWRITE_PROJECT;
  const key = process.env.APPWRITE_KEY;
  if (!endpoint || !project || !key) {
    throw new Error("Appwrite is not configured for uploads");
  }

  const client = new Client().setEndpoint(endpoint).setProject(project).setKey(key);
  const { jwt } = await new Users(client).createJWT({
    userId: user.$id,
    duration: TOKEN_TTL_SECONDS,
  });

  return {
    endpoint,
    project,
    jwt,
    expiresAt: Date.now() + (TOKEN_TTL_SECONDS - 30) * 1000,
  };
}

"use server";

import { getLoggedInUser as readLoggedInUser } from "@/lib/server/appwrite";

/**
 * Server action wrapper so client components can read the signed-in admin
 * without pulling the Appwrite SDK into the browser bundle.
 */
export async function getLoggedInUser() {
  return readLoggedInUser();
}

import { cookies } from "next/headers";
import { Account, Client, Storage, TablesDB } from "node-appwrite";

/**
 * Appwrite resource ids. Read once here so that a missing variable fails loudly
 * at first use instead of producing a request against `undefined`.
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function appwriteIds() {
  return {
    database: requireEnv("APPWRITE_DATABASE_ID"),
    products: requireEnv("APPWRITE_PRODUCTS_COLLECTION_ID"),
    featured: process.env.APPWRITE_FEATURED_COLLECTION_ID,
    productImages: requireEnv("APPWRITE_PRODUCT_IMAGES_BUCKET_ID"),
  };
}

function baseClient() {
  return new Client()
    .setEndpoint(requireEnv("APPWRITE_ENDPOINT"))
    .setProject(requireEnv("APPWRITE_PROJECT"));
}

/**
 * Client bound to the signed-in admin's session cookie. Throws when no session
 * cookie is present, which is what gates every dashboard mutation.
 */
export async function createSessionClient() {
  const client = baseClient();
  const session = (await cookies()).get("admin-session");
  if (!session?.value) throw new Error("No session");
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get tables() {
      return new TablesDB(client);
    },
    get database() {
      return new TablesDB(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

/** Client authenticated with the server API key. Never reaches the browser. */
export async function createAdminClient() {
  const client = baseClient().setKey(requireEnv("APPWRITE_KEY"));

  return {
    get account() {
      return new Account(client);
    },
    get tables() {
      return new TablesDB(client);
    },
    get database() {
      return new TablesDB(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return {
      $id: user.$id,
      name: user.name,
      email: user.email,
      $createdAt: user.$createdAt,
      $updatedAt: user.$updatedAt,
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("admin-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Login failed:", error);

    return {
      success: false,
      error: error.message || "Invalid email or password",
    };
  }
}

export async function signOutUser() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");

    (await cookies()).set("admin-session", "", {
      path: "/",
      expires: new Date(0),
    });
  } catch (error) {
    console.error("Sign out failed:", error);
    throw new Error("Failed to sign out");
  }

  redirect("/auth");
}

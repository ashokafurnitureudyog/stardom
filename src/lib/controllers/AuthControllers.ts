/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/actions/auth.ts
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

    (await cookies()).set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Return a plain object indicating success
    return { success: true };
  } catch (error: any) {
    console.error("Login failed:", error);

    // Return a plain object indicating failure
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

    // Delete the session cookie by setting it to expire immediately
    (
      await // Delete the session cookie by setting it to expire immediately
      cookies()
    ).set("my-custom-session", "", {
      path: "/",
      expires: new Date(0), // Expire the cookie immediately
    });
  } catch (error) {
    console.error("Sign out failed:", error);
    throw new Error("Failed to sign out");
  }

  // Redirect after successful sign-out
  redirect("/auth");
}

"use server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppwriteException } from "node-appwrite";
import { loginSchema, changePasswordSchema } from "@/lib/validations/auth";

export type PasswordState = {
  success: boolean;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

export async function loginUser(
  prevState: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const data = Object.fromEntries(formData);
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid input",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    (await cookies()).set("admin-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Login failed:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Invalid email or password";

    return {
      success: false,
      error: errorMessage,
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
    // Continue with redirect even if session deletion fails
  }

  redirect("/auth");
}

export async function changePassword(
  prevState: PasswordState | null,
  formData: FormData,
): Promise<PasswordState> {
  const data = Object.fromEntries(formData);
  const validatedFields = changePasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid input",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  try {
    const { account } = await createSessionClient();
    await account.updatePassword({
      password: newPassword,
      oldPassword: currentPassword,
    });

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    const appwriteError = error as AppwriteException;

    if (appwriteError.code === 401) {
      return {
        success: false,
        error: "Current password is incorrect",
      };
    }

    if (appwriteError.type === "user_invalid_token") {
      return {
        success: false,
        error: "Session expired - please log in again",
      };
    }

    return {
      success: false,
      error:
        appwriteError.message ||
        "Password update failed. Please check requirements:",
    };
  }
}

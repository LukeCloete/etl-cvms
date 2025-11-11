"use server";

import { cookies } from "next/headers";
import { Models } from "appwrite";
import { z, ZodError } from "zod";
import { createAdminClient, createSessionClient } from "@/appwrite/config";
import { revalidatePath } from "next/cache";
import { AppwriteException, Query } from "node-appwrite";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(3),
});

/**
 * Handles user authentication and session creation on the server.
 * Also sets the default active MSISDN cookie.
 * @param formData - The form data containing email and password.
 */
export async function createSession(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const { email, password } = formSchema.parse(data);

    const { account, tablesDB } = await createAdminClient();
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    cookies().set("session", session.secret, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
      path: "/",
    });

    // Nested try...catch for non-critical part
    try {
      const { account: sessionAccount } = await createSessionClient(
        session.secret
      );
      const user = await sessionAccount.get();
      const { rows: msisdns } = await tablesDB.listRows({
        databaseId: process.env.APPWRITE_DATABASE_ID!,
        tableId: process.env.APPWRITE_TABLE_MSISDNS!,
        queries: [Query.equal("agent", user.$id)],
      });

      if (msisdns.length > 0) {
        cookies().set("active_msisdn", msisdns[0].msisdn.toString(), {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          expires: new Date(session.expire),
          path: "/",
        });
      }
    } catch (error) {
      let warningMessage =
        "Login successful, but failed to set default MSISDN.";
      if (error instanceof AppwriteException) {
        warningMessage =
          "Login successful, but failed to retrieve user details to set default MSISDN.";
      }
      return {
        success: true,
        warning: warningMessage,
      };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: "Invalid form data. Please check your email and password.",
      };
    } else if (error instanceof AppwriteException) {
      if (error.code === 400 || error.code === 401) {
        return { success: false, error: "Invalid email or password." };
      }
      return {
        success: false,
        error:
          "An error occurred with the authentication service. Please try again later.",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

/**
 * Gets the current authenticated user on the server.
 * Returns null if no session is found.
 */
export async function getUser(): Promise<Models.User<Models.Preferences> | null> {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return null;
  }
  try {
    const { account } = await createSessionClient(sessionCookie.value);
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}

/**
 * Sets the active MSISDN for the current user.
 * This is a server action that can be called from client components.
 * @param msisdn - The MSISDN to set as active
 */
export async function setActiveMsisdn(msisdn: string) {
  try {
    const sessionCookie = cookies().get("session");
    if (!sessionCookie) {
      throw new Error("No session found");
    }

    // Verify the MSISDN belongs to the current user
    const { tablesDB, account } = await createSessionClient(
      sessionCookie.value
    );
    const user = await account.get();

    const { rows: msisdns } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_MSISDNS!,
      queries: [
        Query.equal("agent", user.$id),
        Query.equal("msisdn", parseInt(msisdn)),
      ],
    });

    if (msisdns.length === 0) {
      throw new Error("MSISDN does not belong to current user");
    }

    // Set the active MSISDN cookie
    cookies().set("active_msisdn", msisdn, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    // Revalidate all portal pages to reflect the change
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error setting active MSISDN:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Updates the user's profile information (name and phone number).
 * Requires the user's current password to confirm changes.
 */
export async function updateProfile(
  prevState: { message: string },
  formData: FormData
) {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return { message: "Not authenticated" };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);
    const user = await account.get(); // Get current user to check existing data

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string; // Get email from form data
    const password = formData.get("password") as string;

    if (!password) {
      return { message: "Password is required to confirm changes." };
    }

    // Update name if it has changed
    if (name && name !== user.name) {
      await account.updateName({ name });
    }

    // Update phone if it has changed
    if (phone && phone !== user.phone) {
      await account.updatePhone({ phone, password });
    }

    // Update email if it has changed
    if (email && email !== user.email) {
      await account.updateEmail({ email, password });
    }

    revalidatePath("/profile");
    return { message: "Profile updated successfully." };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { message: `Error updating profile: ${e.message}` };
  }
}

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters." })
      .regex(/[a-zA-Z]/, {
        message: "New password must contain at least one letter.",
      })
      .regex(/[0-9]/, {
        message: "New password must contain at least one number.",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "New password must contain at least one special character.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm new password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password do not match.",
    path: ["confirmPassword"],
  });

export async function updatePassword(
  prevState: { message: string },
  formData: FormData
) {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return { message: "Not authenticated" };
  }

  try {
    const data = Object.fromEntries(formData);
    const { currentPassword, newPassword } = passwordSchema.parse(data);

    const { account } = await createSessionClient(sessionCookie.value);
    await account.updatePassword({
      password: newPassword,
      oldPassword: currentPassword,
    });

    revalidatePath("/profile");
    return { message: "Password updated successfully." };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("Error updating password:", e);
    if (e instanceof ZodError) {
      return { message: e.message || "Validation error." };
    }
    if (e instanceof AppwriteException) {
      if (e.code === 401) {
        return { message: "Incorrect current password." };
      }
    }
    return { message: `Error updating password: ${e.message}` };
  }
}

/**
 * Logs the user out by deleting the session.
 */
export async function signOut() {
  try {
    const sessionCookie = cookies().get("session");
    if (!sessionCookie) {
      return; // Already logged out
    }
    const { account } = await createSessionClient(sessionCookie.value);
    //@deprecated — Use the object parameter style method for a better developer experience.
    await account.deleteSession({ sessionId: "current" });

    // Clear cookies
    cookies().delete("session");
    cookies().delete("active_msisdn");
  } catch (error) {
    console.error("Error signing out:", error);
    // Even if Appwrite fails, try to clear cookies
    cookies().delete("session");
    cookies().delete("active_msisdn");
  }

  // Redirect to login page
  redirect("/log-in");
}

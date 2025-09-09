"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient, createSessionClient } from "./appwrite/config";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Models } from "node-appwrite";

interface AuthUser {
  sessionCookie: RequestCookie | undefined;
  user: Models.User<Models.Preferences> | null;
  getUser: () => Promise<Models.User<Models.Preferences> | null>;
  createSession: (formData: any) => Promise<never>;
  deleteSession: () => Promise<never>;
}

const auth: AuthUser = {
  user: null,
  sessionCookie: undefined,

  getUser: async () => {
    auth.sessionCookie = cookies().get("session");

    try {
      const { account } = await createSessionClient(auth.sessionCookie?.value);
      auth.user = await account.get();
    } catch (error) {
      console.error(error);
      auth.user = null;
      auth.sessionCookie = undefined;
    }
    return auth.user;
  },

  createSession: async (formData) => {
    "use server";

    const data = Object.fromEntries(formData);
    const { email, password } = data;
    //only admins has session creating priv
    const { account } = await createAdminClient();

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

    redirect("/");
  },

  deleteSession: async () => {
    "use server";
    auth.sessionCookie = cookies().get("session");
    try {
      const { account } = await createSessionClient(auth.sessionCookie?.value);
      await account.deleteSession({ sessionId: "current" });
    } catch (error) {}

    cookies().delete("session");
    auth.user = null;
    auth.sessionCookie = undefined;
    redirect("/login");
  },
};

export default auth;

/**
 * Handles agent sign-up, creating a user and an agent document.
 */
// export async function signUpAgent(formData: FormData) {
//   const { name, email, password } = Object.fromEntries(formData);
//   const { account, databases } = appwriteServerClient();

//   try {
//     // 1. Create the Appwrite user account
//     const user = await account.create(
//       ID.unique(),
//       email as string,
//       password as string,
//       name as string
//     );

// 2. Create a corresponding agent document in the database
// await databases.createDocument(
//   DATABASE_ID,
//   AGENTS_COLLECTION_ID,
//   user.$id, // Use the user's ID as the document ID for a direct link
//   {
//     name: user.name,
//     current_ebucks: 0,
//     // Add other initial agent data here
//   }
// );

// 3. Automatically create a session for the new user
//     await createAgentSession(formData);
//   } catch (error) {
//     console.error("Failed to sign up agent:", error);
//     redirect(`/signup?error=${(error as any).message}`);
//   }
// }

/**
 * Handles agent sign-in and redirects to the dashboard.
 */
// export async function createAgentSession(formData: FormData) {
//   const { email, password } = Object.fromEntries(formData);
//   const { account } = createPublicClient();

//   try {
//     const session = await account.createEmailPasswordSession(
//       email as string,
//       password as string
//     );

//     cookies().set("session", session.secret, {
//       httpOnly: true,
//       sameSite: "strict",
//       secure: true,
//       expires: new Date(session.expire),
//       path: "/",
//     });
//   } catch (error) {
//     console.error("Failed to create agent session:", error);
//     redirect(`/login?error=${(error as any).message}`);
//   }

//   redirect("/dashboard");
// }

/**
 * Handles admin sign-in. No sign-up function is needed for admins.
 */
// export async function createAdminSession(formData: FormData) {
//   const { email, password } = Object.fromEntries(formData);
//   const { account } = createPublicClient();

//   try {
//     const session = await account.createEmailPasswordSession(
//       email as string,
//       password as string
//     );

//     cookies().set("session", session.secret, {
//       httpOnly: true,
//       sameSite: "strict",
//       secure: true,
//       expires: new Date(session.expire),
//       path: "/",
//     });
//   } catch (error) {
//     console.error("Failed to create admin session:", error);
//     redirect(`/admin/login?error=${(error as any).message}`);
//   }

//   // A server action would check the user's role here
//   // and redirect to the correct dashboard based on a custom attribute.
//   redirect("/admin/dashboard");
// }

/**
 * Deletes the current user's session.
 */
// export async function deleteSession() {
//   const sessionCookie = cookies().get("session");
//   if (!sessionCookie) {
//     redirect("/login");
//   }
//   try {
//     const { account } = createSessionClient(sessionCookie.value);
//     await account.deleteSession("current");
//   } catch (error) {
//     console.error("Failed to delete session:", error);
//   } finally {
//     cookies().delete("session");
//     redirect("/login");
//   }
// }

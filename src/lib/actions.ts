"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Models } from "appwrite";
import { z } from "zod";
import { createAdminClient, createSessionClient } from "@/appwrite/config";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

/**
 * Handles user authentication and session creation on the server.
 * @param formData - The form data containing email and password.
 */
export async function createSession(formData: FormData) {
  const data = Object.fromEntries(formData);
  const { email, password } = formSchema.parse(data);

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

  redirect("/home");
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

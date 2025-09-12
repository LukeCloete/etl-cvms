import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionClient } from "@/appwrite/config";

export async function GET(req: NextRequest) {
  const sessionCookie = cookies().get("session");

  if (!sessionCookie) {
    return NextResponse.json(
      { error: "Unauthorized: No session cookie found." },
      { status: 401 }
    );
  }

  try {
    const { tablesDB } = await createSessionClient(sessionCookie.value);

    const { rows: ebucks_tiers } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: "ebucks_tiers",
    });

    if (!ebucks_tiers) {
      return NextResponse.json(
        { error: "eBucks tiers not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ebucks_tiers });
  } catch (error) {
    console.error("Error fetching eBucks tiers:", error);
  }
}

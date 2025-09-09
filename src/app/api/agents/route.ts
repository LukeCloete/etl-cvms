import { NextRequest } from "next/server";
import { createSessionClient } from "../../../appwrite/config";
import { cookies } from "next/headers";
export async function GET(req: NextRequest) {
  const sessionCookie = cookies().get("session");

  try {
    const { tablesDB } = await createSessionClient(sessionCookie?.value);
    const { rows: agents } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_AGENTS!,
    });

    return Response.json({ agents });
  } catch (error) {
    console.error(error);
    return Response.json("Unauthorized Request", { status: 403 });
  }
}

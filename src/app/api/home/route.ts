import { createSessionClient } from "../../../appwrite/config";
import { cookies } from "next/headers";
export async function GET() {
  const sessionCookie = cookies().get("session");

  try {
    const { tablesDB } = await createSessionClient(sessionCookie?.value);
    const { rows: agents, total } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_CORE_SPEND!,
    });

    return Response.json({ agents, total });
  } catch (error) {
    console.error(error);
    return Response.json("Unauthorized Request", { status: 403 });
  }
}

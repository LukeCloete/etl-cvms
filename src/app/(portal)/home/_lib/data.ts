/* data is for GET requests */

import { createSessionClient } from "../../../../appwrite/config";
import { cookies } from "next/headers";

export async function getData() {
  console.log("this is inside the server action");
  const sessionCookie = cookies().get("session");
  try {
    const { tablesDB } = await createSessionClient(sessionCookie?.value);
    const { rows: agents } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_CORE_SPEND!,
    });

    console.log("agents", agents);
  } catch (error) {
    console.error(error);
    return Response.json("Unauthorized Request", { status: 403 });
  }
}

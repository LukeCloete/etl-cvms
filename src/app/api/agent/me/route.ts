import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { createSessionClient } from "@/appwrite/config";
import { Query } from "node-appwrite";

export async function GET(req: NextRequest) {
  const sessionCookie = cookies().get("session");

  try {
    const { tablesDB, account } = await createSessionClient(
      sessionCookie?.value
    );

    // Step 1: Get the logged-in user's details
    const user = await account.get();

    // Step 2: Query for the agent document related to the logged-in user
    const { rows: agentRow } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_AGENTS!,
      queries: [
        Query.equal("$id", user.$id), // Use Query.equal to search for the user ID
      ],
    });

    if (agentRow.length === 0) {
      return Response.json({ error: "Agent not found" }, { status: 404 });
    }
    const agent = agentRow[0];

    // Step 3: Query for MSISDNs related to this specific agent
    const { rows: msisdns } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_MSISDNS!,
      // Assuming an `agentId` attribute links MSISDNs to the agent
      queries: [
        Query.equal("agent", agent.$id), // Use Query.equal to search for the agent ID
      ],
    });

    // Fetch core spend data for the active MSISDN
    // const { rows: coreSpendRows } = await tablesDB.listRows({
    //   databaseId: process.env.APPWRITE_DATABASE_ID!,
    //   tableId: "core_spend", // Replace with your actual table ID
    //   queries: [Query.equal("msisdn", activeMsisdn.msisdn)],
    // });

    // Fetch performance rankings data for the active MSISDN
    // const { rows: performanceRankingsRows } = await tablesDB.listRows({
    //   databaseId: process.env.APPWRITE_DATABASE_ID!,
    //   tableId: "performance_rankings", // Replace with your actual table ID
    //   queries: [Query.equal("msisdn", activeMsisdn.msisdn)],
    // });

    const agentWithData = {
      ...agent,
      msisdns,
    };

    return NextResponse.json({ agent: agentWithData });
  } catch (error) {
    console.error("Error fetching agent data:", error);
    return Response.json("Unauthorized Request", { status: 403 });
  }
}

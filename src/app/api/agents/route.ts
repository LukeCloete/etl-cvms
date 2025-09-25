import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionClient } from "@/appwrite/config";
import { Query } from "node-appwrite";

export async function GET(req: NextRequest) {
  const sessionCookie = cookies().get("session");
  const msisdn = req.nextUrl.searchParams.get("msisdn");

  if (!msisdn) {
    return NextResponse.json({ error: "MSISDN is required" }, { status: 400 });
  }

  try {
    const { tablesDB } = await createSessionClient(sessionCookie?.value);

    // Step 1: Find the MSISDN document
    const { rows: msisdnRows } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_MSISDNS!,
      queries: [Query.equal("msisdn", parseInt(msisdn))],
    });

    if (msisdnRows.length === 0) {
      return NextResponse.json({ error: "MSISDN not found" }, { status: 404 });
    }

    const msisdnDoc = msisdnRows[0];
    const agentId = msisdnDoc.agent;

    // Step 2: Get the agent document
    const { rows: agentRow } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_AGENTS!,
      queries: [Query.equal("$id", agentId)],
    });

    if (agentRow.length === 0) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const agent = agentRow[0];

    // Step 3: Get all MSISDNs for that agent
    const { rows: msisdns } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_MSISDNS!,
      queries: [Query.equal("agent", agent.$id)],
    });

    const agentWithData = {
      ...agent,
      msisdns,
    };

    return NextResponse.json({ agent: agentWithData });
  } catch (error) {
    console.error("Error fetching agent data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching agent data" },
      { status: 500 }
    );
  }
}

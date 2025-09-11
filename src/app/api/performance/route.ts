import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionClient } from "@/appwrite/config";
import { Query } from "node-appwrite";

export async function GET(req: NextRequest) {
  const sessionCookie = cookies().get("session");

  const url = new URL(req.url);
  const msisdn = url.searchParams.get("msisdn");

  if (!sessionCookie) {
    return NextResponse.json(
      { error: "Unauthorized: No session cookie found." },
      { status: 401 }
    );
  }

  if (!msisdn) {
    return NextResponse.json(
      { error: "MSISDN parameter is required" },
      { status: 400 }
    );
  }

  try {
    const { tablesDB } = await createSessionClient(sessionCookie.value);

    // Step 1: Find the MSISDN document ID based on the msisdn value.
    const { rows: msisdnRows } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: "msisdns", // Assuming this is the table with the actual msisdn values
      queries: [Query.equal("msisdn", parseInt(msisdn))],
    });

    const msisdnDoc = msisdnRows[0] || null;

    if (!msisdnDoc) {
      return NextResponse.json(
        { error: "MSISDN document not found." },
        { status: 404 }
      );
    }

    const msisdnDocId = msisdnDoc.$id;

    // Step 2: Use the document ID to find the related core spend data.
    const { rows: performanceRows } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: "performance_rankings",
      // The core_spend table's msisdn column is a relationship, so we query by the document ID.
      queries: [Query.equal("msisdn", msisdnDocId)],
    });

    const performanceData = performanceRows || null;

    if (!performanceData) {
      return NextResponse.json(
        { error: "Performance data not found for this MSISDN." },
        { status: 404 }
      );
    }

    return NextResponse.json({ performanceData });
  } catch (error) {
    console.error("Error fetching performance data:", error);
  }
}

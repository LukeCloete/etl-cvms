import { createAdminClient } from "@/appwrite/config";
import { Query } from "appwrite";

/**
 * Fetches ebucks log data for a given MSISDN.
 * @param msisdn The MSISDN string to look up.
 * @returns The ebucks log data object, or null if not found.
 */
export async function getEbucksLogData(msisdn: string) {
  if (!msisdn) {
    console.error("MSISDN is required for getEbucksLogData");
    return null;
  }

  try {
    const { tablesDB } = await createAdminClient();

    const { rows: msisdnRows } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_MSISDNS!,
      queries: [Query.equal("msisdn", parseInt(msisdn))],
    });

    const msisdnDoc = msisdnRows[0] || null;
    if (!msisdnDoc) {
      console.error("MSISDN document not found:", msisdn);
      return null;
    }

    const { rows: ebucksRows } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: "ebucks_log",
      queries: [Query.equal("msisdn", msisdnDoc.$id)],
    });

    return { ebucksData: ebucksRows || [] };
  } catch (error) {
    console.error("Error fetching ebucks data:", error);
    return null;
  }
}

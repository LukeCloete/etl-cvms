import { createAdminClient } from "@/appwrite/config";
import { Query } from "appwrite";

/**
 * Fetches core spend data for a given MSISDN.
 * @param msisdn The MSISDN string to look up.
 * @returns The core spend data object, or null if not found.
 */
export async function getCoreSpendData(msisdn: string) {
    if (!msisdn) {
      console.error("MSISDN is required for getCoreSpendData");
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
  
      const { rows: coreSpendRows } = await tablesDB.listRows({
        databaseId: process.env.APPWRITE_DATABASE_ID!,
        tableId: "core_spend",
        queries: [Query.equal("msisdn", msisdnDoc.$id)],
      });
  
      return { coreSpendData: coreSpendRows[0] || null };
    } catch (error) {
      console.error("Error fetching core spend data:", error);
      return null;
    }
  }
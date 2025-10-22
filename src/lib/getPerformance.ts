import { createAdminClient } from "@/appwrite/config";
import { Query } from "appwrite";

/**
 * Fetches performance data for a given MSISDN.
 * @param msisdn The MSISDN string to look up.
 * @returns The performance data array, or null if not found.
 */
export async function getPerformanceData(msisdn: string) {
    if (!msisdn) {
      console.error("MSISDN is required for getPerformanceData");
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
  
      const { rows: performanceRows } = await tablesDB.listRows({
        databaseId: process.env.APPWRITE_DATABASE_ID!,
        tableId: "performance_rankings",
        queries: [Query.equal("msisdn", msisdnDoc.$id)],
      });
  
      return { performanceData: performanceRows || null };
    } catch (error) {
      console.error("Error fetching performance data:", error);
      return null;
    }
  }
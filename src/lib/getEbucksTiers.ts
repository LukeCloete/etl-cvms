import { createAdminClient } from "@/appwrite/config";

/**
 * Fetches all eBucks tiers.
 * @returns An array of eBucks tiers, or null if error occurs.
 */
export async function getEbucksTiers() {
    try {
      const { tablesDB } = await createAdminClient();
  
      const { rows: ebucks_tiers } = await tablesDB.listRows({
        databaseId: process.env.APPWRITE_DATABASE_ID!,
        tableId: "ebucks_tiers",
      });
  
      return { ebucks_tiers: ebucks_tiers || [] };
    } catch (error) {
      console.error("Error fetching eBucks tiers:", error);
      return null;
    }
  }
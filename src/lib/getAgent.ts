import { createAdminClient, createSessionClient } from "@/appwrite/config";
import { Query } from "node-appwrite";
import { cookies } from "next/headers";
import { Agents, Msisdns } from "./definitions";

/**
 * Gets the currently logged-in agent's data with all their MSISDNs.
 * This function uses the session cookie to identify the user.
 * @returns The agent object with a list of all their MSISDNs, or null if not found.
 */
export async function getCurrentAgent(): Promise<Agents | null> {
  try {
    const sessionCookie = cookies().get("session");
    if (!sessionCookie) {
      console.error("No session cookie found");
      return null;
    }

    const { tablesDB, account } = await createSessionClient(sessionCookie.value);

    // Step 1: Get the logged-in user's details
    const user = await account.get();

    // Step 2: Get the agent document for this user
    const { rows: agentRows } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_AGENTS!,
      queries: [Query.equal("$id", user.$id)],
    });

    if (agentRows.length === 0) {
      console.error("Agent not found for user:", user.$id);
      return null;
    }

    const agent = agentRows[0];

    // Step 3: Get all MSISDNs for this agent
    const { rows: msisdnsRow } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_MSISDNS!,
      queries: [Query.equal("agent", agent.$id)],
    });

    const msisdns = msisdnsRow as unknown as Msisdns[];
    

    
    return {
      $id: agent.$id,
      name: agent.name,
      current_points: agent.current_points,
      current_ebucks: agent.current_ebucks,
      msisdns: msisdns ,
      $createdAt: new Date(agent.$createdAt),
      $updatedAt: new Date(agent.$updatedAt),
    };
  } catch (error) {
    console.error("Error fetching current agent:", error);
    return null;
  }
}

/**
 * Gets the active MSISDN from cookie, or returns the first MSISDN if not set.
 * @param agent The agent object containing MSISDNs
 * @returns The active MSISDN string, or null if agent has no MSISDNs
 */
export function getActiveMsisdn(agent: Agents | null) {
  if (!agent || !agent.msisdns || agent.msisdns.length === 0) {
    return "no msisdns";
  }

  // Try to get active MSISDN from cookie
  const activeMsisdnCookie = cookies().get("active_msisdn");
  
  if (activeMsisdnCookie) {
    const cookieValue = activeMsisdnCookie.value;
    // Verify this MSISDN belongs to the agent
    const msisdnExists = agent.msisdns.some(
      (m) => m.msisdn.toString() === cookieValue
    );
    if (msisdnExists) {
      return cookieValue;
    }
  }

  // Default to first MSISDN
  return agent.msisdns[0].msisdn.toString();
}

/**
 * Gets the current agent with their active MSISDN.
 * This is the main function to use in layouts and pages.
 * @returns Object containing agent and activeMsisdn, or null if not authenticated
 */
export async function getAgentWithActiveMsisdn(): Promise<{
  agent: Agents;
  activeMsisdn: string;
} | null> {
  try {
    const agent = await getCurrentAgent();
    if (!agent) {
      return null;
    }

    const activeMsisdn  = getActiveMsisdn(agent);
    if (!activeMsisdn) {
      console.error("No active MSISDN found for agent");
      return null;
    }

    return {
      agent,
      activeMsisdn,
    };
  } catch (error) {
    console.error("Error fetching agent with active MSISDN:", error);
    return null;
  }
}

/**
 * Fetches the combined agent and MSISDN data based on a single MSISDN.
 * @deprecated Use getCurrentAgent() and getActiveMsisdn() instead
 * @param msisdn The MSISDN string to look up.
 * @returns The agent object with a list of all their MSISDNs.
 */
export async function getAgentData(msisdn: string): Promise<Agents | null> {
  if (!msisdn) return null;

  try {
    const { tablesDB } = await createAdminClient();

    // Step 1: Find the MSISDN document
    const { rows: msisdnRows } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_MSISDNS!,
      queries: [Query.equal("msisdn", parseInt(msisdn))],
    });

    if (msisdnRows.length === 0) return null;

    const msisdnDoc = msisdnRows[0];
    const agentId = msisdnDoc.agent;

    // Step 2: Get the agent document
    const { rows: agentRow } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_AGENTS!,
      queries: [Query.equal("$id", agentId)],
    });

    if (agentRow.length === 0) return null;

    const agent = agentRow[0];

    // Step 3: Get all MSISDNs for that agent
    const { rows: msisdnsRow } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_MSISDNS!,
      queries: [Query.equal("agent", agent.$id)],
    });

    const msisdns = msisdnsRow[0];

    return {
      $id: agent.$id,
      name: agent.name,
      current_points: agent.current_points,
      current_ebucks: agent.current_ebucks,
      msisdns: msisdns.map((m: Msisdns) => ({
        $id: m.$id,
        msisdn: m.msisdn,
        agent: m.agent,
        current_ebucks_balance: m.current_ebucks_balance,
        current_performance_score: m.current_performance_score,
        current_performance_rank: m.current_performance_rank,
        $createdAt: new Date(m.$createdAt),
        $updatedAt: new Date(m.$updatedAt),
      })) as Msisdns[],
      $createdAt: new Date(agent.$createdAt),
      $updatedAt: new Date(agent.$updatedAt),
    } as Agents;
  } catch (error) {
    console.error("Error fetching agent data:", error);
    return null;
  }
}







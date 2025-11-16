import { Agent_Weekly_Performance } from "@/lib/definitions";

/**
 * Represents a single row in the transaction table after processing.
 * The original weekly performance data is split into separate 'cashin' and 'cashout' records.
 */
export type ProcessedTransaction = Agent_Weekly_Performance & {
  transaction_type: "cashin" | "cashout";
};

export interface Msisdns {
  $id: string;
  msisdn: number;
  agent: Agents[];
  current_ebucks_balance: number;
  current_performance_score: number;
  current_performance_rank: number;
  $createdAt: Date;
  $updatedAt: Date;
}

export interface Agents {
  $id: string;
  name: string;
  email?: string;
  phone?: string;
  current_points: number;
  current_ebucks: number;
  msisdns: Msisdns[];
  $createdAt: Date;
  $updatedAt: Date;
}

export interface Core_Spend {
  $id: string;
  date: Date;
  last_usage_date: Date;
  total_data_usage: number;
  total_voice_usage: number;
  total_sms_usage: number;
  msisdn: Msisdns[];
  $createdAt: Date;
  $updatedAt: Date;
}

export interface Performance_Rankings {
  $id: string;
  txn_week: Date;
  weekly_transactions: number;
  prev_weekly_txn: number;
  txn_growth_pct: number;
  weekly_value: number;
  prev_weekly_value: number;
  value_growth_pct: number;
  avg_value_per_txn: number;
  prev_avg_value_per_txn: number;
  avg_growth_pct: number;
  performance_score: number;
  txn_type: "CASHIN" | "CASHOUT";
  msisdn: Msisdns[];
  $createdAt: Date;
  $updatedAt: Date;
}

export interface Agent_Weekly_Performance {
  $id: string;
  msisdn: Msisdns[];
  agent_category: "Wholesaler" | "Retail" | "Agents" | "Merchants";
  week_start_date: Date;
  week_end_date: Date;
  week_total_cashin_count: number;
  week_total_cashin_value: number;
  week_total_cashout_count: number;
  week_total_cashout_value: number;
  week_total_transaction_count: number;
  week_total_transaction_value: number;
  current_week_avg_cashin_value: number;
  current_week_avg_cashout_value: number;
  current_week_avg_combined_value: number;
  value_to_surpass_next_agent_cashin: number;
  txns_to_surpass_next_agent_cashin: number;
  value_to_surpass_next_agent_cashout: number;
  txns_to_surpass_next_agent_cashout: number;
  value_to_surpass_next_agent_overall: number;
  txns_to_surpass_next_agent_overall: number;
  suggestion_week_cashin: string;
  suggestion_week_cashout: string;
  suggestion_week_overall: string;
  rank_week_cashin_value: number;
  rank_week_cashout_value: number;
  rank_week_overall_value: number;
  $createdAt: Date;
  $updatedAt: Date;
}

export interface Ebucks_log {
  $id: string;
  date: Date;
  usage_type: "SMS" | "VOICE" | "DATA" | "CASHIN" | "CASHOUT";
  points_change: number;
  msisdn: Msisdns[];
  $createdAt: Date;
  $updatedAt: Date;
}

export interface Ebucks_Tiers {
  $id: string;
  tier_name: "bronze" | "silver" | "gold" | "platinum";
  min_balance_req: number;
  $createdAt: Date;
  $updatedAt: Date;
}

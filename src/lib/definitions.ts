export interface Msisdns {
  $id: string;
  msisdn: number;
  agent: Agents[];
  $createdAt: Date;
  $updatedAt: Date;
}

export interface Agents {
  $id: string;
  name: string;
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
  txt_week: Date;
  weekly_transactions: number;
  prev_weekly_txt: number;
  txt_grwoth_pct: number;
  weekly_value: number;
  prev_weekly_value: number;
  value_growth_pct: number;
  avg_value_per_txt: number;
  prev_avg_value_per_txn: number;
  avg_growth_pct: number;
  performance_score: number;
  txn_type: "CASHIN" | "CASHOUT";
  msisdn: Msisdns[];
  $createdAt: Date;
  $updatedAt: Date;
}

export interface Ebucks_log {
  $id: string;
  date: Date;
  usage_type: any;
  points_change: number;
  msisdn: Msisdns[];
  $createdAt: Date;
  $updatedAt: Date;
}

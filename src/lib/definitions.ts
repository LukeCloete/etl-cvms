export interface Msisdn {
  $id: string;
  msisdn: number;
}

export interface Agent {
  $id: string;
  name: string;
  current_points: number;
  current_ebucks: number;
  msisdns: Msisdn[];
}

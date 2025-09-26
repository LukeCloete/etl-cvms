import { Card, CardContent } from "@/components/ui/card";
import { LayoutPanelLeft, TrendingUp, TrendingDown } from "lucide-react";
import { AgentResponse } from "../home/page";
import { cookies } from "next/headers";
import TranTable from "./_components/TranTable";
import { Performance_Rankings } from "@/lib/definitions";

export const dynamic = "force-dynamic";

// Define the base URL for API calls using an environment variable.
// It falls back to http://localhost:3000 for local development.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface HomeProps {
  searchParams: {
    msisdn?: string;
  };
}
// // Define the structure of the object
// interface MsisdnData {
//   msisdn: number;
//   current_ebucks_balance: number;
//   current_performance_score: number;
//   // Add other properties that are part of the object
// }

async function getAgentData(msisdn: string) {
  const res = await fetch(`${BASE_URL}/api/agents?msisdn=${msisdn}`, {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return res.json();
}

async function getEbucksData(msisdn: string) {
  const res = await fetch(`${BASE_URL}/api/ebucks?msisdn=${msisdn}`, {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return res.json();
}

async function getPerformanceData(msisdn: string) {
  const res = await fetch(`${BASE_URL}/api/performance?msisdn=${msisdn}`, {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return res.json();
}

export default async function page({ searchParams }: HomeProps) {
  const msisdn = searchParams.msisdn!;

  const [agentData, performanceData, ebucksData] = await Promise.all([
    getAgentData(msisdn),
    getPerformanceData(msisdn),
    getEbucksData(msisdn),
  ]);

  const agent: AgentResponse = agentData;
  const performance: { performanceData: Performance_Rankings[] } =
    performanceData;
  const eBucks = ebucksData;

  const activeMsisddn = agent.agent.msisdns.find(
    (m) => m.msisdn === parseInt(msisdn)
  );
  const currentEbucksBalance = activeMsisddn?.current_ebucks_balance || 0;

  const totalRedeemed = 0;
  const remainingBalance = currentEbucksBalance - totalRedeemed;

  // console.log("performance data passed to TranTable:", performance);
  // console.log("ebucks data passed to TranTable:", ebucks);

  return (
    <div>
      <div className="flex p-8">
        <div className="ml-4 mr-4 w-full">
          <div className="text-econetBlue mb-4">
            <p>Home &gt; History</p>
          </div>
          <p className="text-econetBlue text-3xl font-bold">
            Transaction History
          </p>
          <p className="mt-4 mb-8">
            Track your E-Bucks earnings and redemptions
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Card className="w-1/3">
              <CardContent className="flex justify-between ">
                <div className="flex flex-col space-y-1  mt-9">
                  <p className="font-bold">Total Earned</p>
                  <p className="text-green-500 text-2xl font-bold">
                    {currentEbucksBalance}
                  </p>
                  <p>E-Bucks</p>
                </div>
                <TrendingUp className="text-green-500 mt-16" />
              </CardContent>
            </Card>

            <Card className="w-1/3">
              <CardContent className="flex justify-between  ">
                <div className="flex flex-col space-y-1 mt-9">
                  <p className="font-bold">Total Redeemed</p>
                  <p className="text-red-500 text-2xl font-bold">
                    {totalRedeemed}
                  </p>
                  <p>E-Bucks</p>
                </div>
                <TrendingDown className="text-red-500 mt-16" />
              </CardContent>
            </Card>

            <Card className="w-1/3">
              <CardContent className="flex justify-between  ">
                <div className="flex flex-col space-y-1 mt-9">
                  <p className="font-bold">Current Balance</p>
                  <p className="text-blue-500 text-2xl font-bold">
                    {remainingBalance}
                  </p>
                  <p>E-Bucks</p>
                </div>
                <LayoutPanelLeft className="text-blue-500 mt-16" />
              </CardContent>
            </Card>
          </div>
          {/* Recent Transactions */}
          <TranTable performanceData={performance} ebucksData={eBucks} />
        </div>
      </div>
    </div>
  );
}

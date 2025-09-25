import { Card, CardContent } from "@/components/ui/card";
import { LayoutPanelLeft, TrendingUp, TrendingDown } from "lucide-react";
import { AgentResponse, getPerformanceData } from "../home/page";
import { getAgentData } from "../home/page";
import { cookies } from "next/headers";
import TranTable from "./_components/TranTable";

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

async function getEbucksData(msisdn: string) {
  const res = await fetch(`http://localhost:3000/api/ebucks?msisdn=${msisdn}`, {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return res.json();
}

export default async function page({ searchParams }: HomeProps) {
  console.log("This is in the history page");
  const msisdn = searchParams.msisdn!;

  /* When i specify the data to be Performance_Rankings[] instead of any i get errors */
  const agentData: AgentResponse = await getAgentData(msisdn);
  const performanceData = await getPerformanceData(msisdn);
  const ebucksData = await getEbucksData(msisdn);

  const [agent, performance, ebucks] = await Promise.all([
    agentData,
    performanceData,
    ebucksData,
  ]);

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
          <TranTable performanceData={performance} ebucksData={ebucks} />
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { LayoutPanelLeft, TrendingUp, TrendingDown } from "lucide-react";
import TranTable from "./_components/TranTable";
import { Msisdns } from "@/lib/definitions";
import { getAgentWithActiveMsisdn } from "@/lib/getAgent";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import HistoryCardSkeleton from "./_components/HistoryCardSkeleton";
import { columns } from "./_definitions/columns";
import { getAgentWeeklyPerformanceData } from "@/lib/getPerformance";

export default async function page() {
  // Get agent and active MSISDN from cookies
  const data = await getAgentWithActiveMsisdn();

  if (!data) {
    redirect("/log-in");
  }

  const { agent, activeMsisdn } = data;

  // Fetch all page data in parallel for better performance
  const [agentWeeklyPerformanceData] = await Promise.all([
    getAgentWeeklyPerformanceData(activeMsisdn!),
  ]);

  // Find the active MSISDN object
  const activeMsisdnObj: Msisdns | undefined = agent.msisdns.find(
    (m: Msisdns) => m.msisdn.toString() === activeMsisdn
  );

  const currentEbucksBalance = activeMsisdnObj?.current_ebucks_balance || 0;

  const totalRedeemed = 0;
  const remainingBalance = currentEbucksBalance - totalRedeemed;

  // console.log("performance data passed to TranTable:", performance);
  // console.log("ebucks data passed to TranTable:", ebucks);

  return (
    <div>
      <div className="flex p-8">
        <div className="ml-4 mr-4 w-full mt-16">
          <p className="text-econetBlue text-3xl font-bold">
            Transaction History
          </p>
          <p className="mt-4 mb-8">
            Track your E-Bucks earnings and redemptions
          </p>
          <div className="flex justify-center gap-4 mb-8 ">
            <Suspense fallback={<HistoryCardSkeleton />}>
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
            </Suspense>
          </div>
          {/* Recent Transactions */}
          {/* <TranTable
            performanceData={{ performanceData: performance }}
            ebucksData={{ ebucksData: eBucks }}
          /> */}
          <div className="ml-4 mr-4 w-full mt-16">
            <TranTable
              columns={columns}
              data={agentWeeklyPerformanceData ?? []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

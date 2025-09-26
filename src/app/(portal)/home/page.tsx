import { Agents, Core_Spend, Performance_Rankings } from "@/lib/definitions";
import Cards from "./_components/Cards";
import { cookies } from "next/headers";
import HomeCard from "./_components/HomeCard";

// It forces the page to be rendered on every request.
export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface HomeProps {
  searchParams: {
    msisdn?: string;
  };
}

async function getCoreSpendData(msisdn: string) {
  const res = await fetch(`${BASE_URL}/api/core_spend?msisdn=${msisdn}`, {
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

async function getAgentData(msisdn: string) {
  const res = await fetch(`${BASE_URL}/api/agents?msisdn=${msisdn}`, {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return res.json();
}

async function getEbucksTiers() {
  const res = await fetch(`${BASE_URL}/api/ebucks_tiers`, {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return res.json();
}

// async function getEbucksLog(msisdn: string) {
//   const res = await fetch(
//     `http://localhost:3000/api/ebucks_log?msisdn=${msisdn}`,
//     {
//       method: "get",
//       headers: {
//         Cookie: cookies().toString(),
//       },
//     }
//   );
//   return res.json();
// }

export interface AgentResponse {
  agent: Agents;
}

export default async function page({ searchParams }: HomeProps) {
  const msisdn = searchParams.msisdn!;

  const [agentData, coreSpendData, performanceData, ebucksTiersData] =
    await Promise.all([
      getAgentData(msisdn),
      getCoreSpendData(msisdn),
      getPerformanceData(msisdn),
      getEbucksTiers(),
    ]);

  const agent: AgentResponse = agentData;
  const coreSpend: { coreSpendData: Core_Spend } = coreSpendData;
  const performance: { performanceData: Performance_Rankings[] } =
    performanceData;
  const ebucksTiers = ebucksTiersData;

  const activeMsisddn = agent.agent.msisdns.find(
    (m) => m.msisdn === parseInt(msisdn)
  );

  // const currentEbucksBalance = activeMsisddn?.current_ebucks_balance || 0;
  // const currentPerformanceScore = activeMsisddn?.current_performance_score || 0;

  return (
    <div>
      <div className="flex p-8 gap-8 ">
        <div className="w-full flex flex-col gap-8">
          <p className="text-econetBlue text-3xl font-bold">
            Welcome {agent.agent.name || "Agent"}
          </p>

          <HomeCard
            msisdn={activeMsisddn!}
            eBucksTiers={ebucksTiers.ebucks_tiers || []}
          />

          <Cards coreSpendData={coreSpend} performanceData={performance} />

          {/* <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex">Quick Actions</CardTitle>
              <CardDescription>
                Access your favourite features instantly
              </CardDescription>
            </CardHeader>
            <CardContent className=" flex h-32 mt-4 space-x-8">
              <div className="bg-econetBlue text-econetWhite w-1/2 flex justify-center items-center align-items rounded-xl ">
                <p className="flex flex-col justify-center items-center ">
                  <CardSim />
                  Redeem Bundles
                </p>
              </div>
              <div className="w-1/2 flex justify-center items-center rounded-xl border-2 border-solid">
                <p className="flex flex-col justify-center items-center ">
                  <Gift />
                  Item Shop
                </p>
              </div>
            </CardContent>
          </Card> */}

          {/* <Card>
            <CardHeader>
              <CardTitle>Popular Rewards</CardTitle>
              <CardDescription>
                View the most redeemed bundles this week
              </CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <Card className=" flex flex-col justify-center items-center">
                <CardHeader>
                  <CardTitle>
                    <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                      <CardSim className="text-white size-8" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <p className="text-econetBlue">Daily Bundle</p>
                  <p className="text-econetBlue text-2xl font-bold">20 MB</p>
                  <p className="text-red-500">200 E-Bucks</p>
                  <p className="text-econetBlue">Bundle expires at midnight</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card> */}
        </div>

        {/* <div className="w-1/3 flex flex-col gap-4"> */}
        {/* <RecentActivity ebucksLog={ebucksLog} /> */}

        {/* Earning tips card  */}
        {/* <Card>
            <CardHeader>
              <CardTitle className="flex space-x-2 text-green-600">
                <div>
                  <Lightbulb />
                </div>
                <div>Earning tips</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p>- Make calls to earn 5 E-Bucks per minute</p>
              <p>- Use data to get bonus E-Bucks daily</p>
              <p>- Refer friends for 100 E-Bucks each</p>
              <p>- Complete monthly challenges</p>
            </CardContent>
          </Card> */}
        {/* </div> */}
      </div>
    </div>
  );
}

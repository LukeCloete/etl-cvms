import RewardProfileCard from "./_components/RewardProfileCard";
import RewardRowCard from "./_components/RewardRowCard";
import { AgentResponse, HomeProps } from "../home/page";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getAgentData(msisdn: string) {
  const res = await fetch(`${BASE_URL}/api/agents?msisdn=${msisdn}`, {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return res.json();
}

export async function getEbucksTiers() {
  const res = await fetch(`${BASE_URL}/api/ebucks_tiers`, {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return res.json();
}

export default async function page({ searchParams }: HomeProps) {
  const msisdn = searchParams.msisdn!;
  const [agentData, ebucksTiersData] = await Promise.all([
    getAgentData(msisdn),
    getEbucksTiers(),
  ]);

  const agent: AgentResponse = agentData;
  const ebucksTiers = ebucksTiersData;

  const activeMsisddn = agent.agent.msisdns.find(
    (m) => m.msisdn === parseInt(msisdn)
  );
  const ebucksBalance = 0;

  return (
    <div>
      <div className="flex p-8 ">
        <div className="w-1/5 flex flex-col gap-4">
          <RewardProfileCard
            msisdn={activeMsisddn!}
            eBucksBalance={ebucksBalance.toString()}
            eBucksTiers={ebucksTiers.ebucks_tiers || []}
          />
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex space-x-2 text-econetBlue ">
                <div>
                  <History />
                </div>
                <div>Your Recent Activity</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div>
                <p className="font-bold">E-Bucks Earned</p>
                <p>Call made - 12 min</p>
              </div>
              <p className="bg-econetBlue p-2 text-econetWhite ml-auto flex rounded-full justify-center items-center">
                +25 E-Bucks
              </p>
            </CardContent>
            <CardContent className=" flex">
              <div>
                <p className="font-bold">E-Bucks Earned</p>
                <p>Call made - 16 min</p>
              </div>
              <p className="bg-econetBlue p-2 text-econetWhite ml-auto flex rounded-full justify-center items-center">
                +25 E-Bucks
              </p>
            </CardContent>
          </Card> */}
        </div>

        <div className="w-4/5 ml-8 ">
          <div className="flex flex-col mb-4">
            <div className="text-econetBlue mb-4">
              <p>Home &gt; Rewards </p>
            </div>
            <p className=" text-econetBlue text-3xl font-bold">
              Available rewards
            </p>
          </div>

          {/* First div for all the cards */}
          <RewardRowCard></RewardRowCard>
        </div>
      </div>
    </div>
  );
}

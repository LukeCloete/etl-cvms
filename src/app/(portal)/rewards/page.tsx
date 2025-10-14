import { getAgentWithActiveMsisdn } from "@/lib/getAgent";
import RewardProfileCard from "./_components/RewardProfileCard";
import RewardRowCard from "./_components/RewardRowCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getEbucksTiers } from "@/lib/getEbucksTiers";
import { Ebucks_Tiers, Msisdns } from "@/lib/definitions";

export default async function page() {
  // Get agent and active MSISDN from cookies
  const data = await getAgentWithActiveMsisdn();

  if (!data) {
    redirect("/log-in");
  }

  const { agent, activeMsisdn } = data;

  // Fetch all data in parallel
  const ebucksTiersData = await getEbucksTiers();

  const ebucksTiers: Ebucks_Tiers[] =
    (ebucksTiersData?.ebucks_tiers as unknown as Ebucks_Tiers[]) || [];

  // Find the active MSISDN object
  const activeMsisdnObj: Msisdns | undefined = agent.msisdns.find(
    (m: Msisdns) => m.msisdn.toString() === activeMsisdn
  );

  const ebucksBalance = 0;

  return (
    <div>
      <div className="flex p-8 ">
        <div className="w-1/5 flex flex-col gap-4">
          <RewardProfileCard
            msisdn={activeMsisdnObj || null}
            eBucksBalance={ebucksBalance.toString()}
            eBucksTiers={ebucksTiers}
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

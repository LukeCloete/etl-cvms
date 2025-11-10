import {
  Msisdns,
  Ebucks_Tiers,
  Core_Spend,
  Performance_Rankings,
  Agent_Weekly_Performance,
} from "@/lib/definitions";
import { WeeklyPerformance } from "./_components/WeeklyPerformance";
import FilteredCards from "./_components/FilteredCards";
import HomeCard from "./_components/HomeCard";
import HomeCardSkeleton from "./_components/HomeCardSkeleton";
import CardsSkeleton from "./_components/CardsSkeleton";
import { getAgentWithActiveMsisdn } from "@/lib/getAgent";
import { getEbucksTiers } from "@/lib/getEbucksTiers";
import { getCoreSpendData } from "@/lib/getCoreSpend";
import {
  getAgentWeeklyPerformanceData,
  getPerformanceData,
} from "@/lib/getPerformance";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  // Get agent and active MSISDN from cookies
  const data = await getAgentWithActiveMsisdn();

  if (!data) {
    redirect("/log-in");
  }

  const { agent, activeMsisdn } = data;

  // Fetch all page data in parallel for better performance
  const [
    ebucksTiersData,
    coreSpendData,
    performanceData,
    agentWeeklyPerformanceData,
  ] = await Promise.all([
    getEbucksTiers(),
    getCoreSpendData(activeMsisdn!),
    getPerformanceData(activeMsisdn!),
    getAgentWeeklyPerformanceData(activeMsisdn!),
  ]);

  const ebucksTiers: Ebucks_Tiers[] =
    (ebucksTiersData?.ebucks_tiers as unknown as Ebucks_Tiers[]) || [];

  // Safely extract the full datasets for the cards
  const allCoreSpend: Core_Spend[] =
    (coreSpendData?.coreSpendData as unknown as Core_Spend[]) || [];
  const allPerformance: Performance_Rankings[] =
    (performanceData?.performanceData as unknown as Performance_Rankings[]) ||
    [];

  // Find the active MSISDN object
  const activeMsisdnObj: Msisdns | undefined = agent.msisdns.find(
    (m: Msisdns) => m.msisdn.toString() === activeMsisdn
  );

  return (
    <div>
      <div className="flex p-8 gap-8 ">
        <div className="w-full flex flex-col gap-8">
          <p className="text-econetBlue text-3xl font-bold mt-16">
            Welcome {agent.name || "Agent"}
          </p>

          <Suspense fallback={<HomeCardSkeleton />}>
            <HomeCard
              msisdn={activeMsisdnObj || null}
              eBucksTiers={ebucksTiers}
            />
          </Suspense>

                    <Suspense fallback={<CardsSkeleton />}>
                      <WeeklyPerformance weeklyPerformanceData={agentWeeklyPerformanceData} />
                    </Suspense>        </div>
      </div>
    </div>
  );
}

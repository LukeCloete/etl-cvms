import { Msisdns, Ebucks_Tiers } from "@/lib/definitions";
import Cards from "./_components/Cards";
import HomeCard from "./_components/HomeCard";
import HomeCardSkeleton from "./_components/HomeCardSkeleton";
import CardsSkeleton from "./_components/CardsSkeleton";
import { getAgentWithActiveMsisdn } from "@/lib/getAgent";
import { getEbucksTiers } from "@/lib/getEbucksTiers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
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
            <Cards activeMsisdn={activeMsisdnObj || null} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

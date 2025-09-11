import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardCard from "@/components/DashboardCard";
import { History, Gift, CardSim, Lightbulb } from "lucide-react";

import axiosInstance from "@/lib/axiosInstance";
import { Agents, Core_Spend, Performance_Rankings } from "@/lib/definitions";
import { redirect } from "next/navigation";
import Cards from "./_components/Cards";
import { cookies } from "next/headers";

interface HomeProps {
  searchParams: {
    msisdn?: string;
  };
}

async function getCoreSpendData(msisdn: string) {
  const res = await fetch(
    `http://localhost:3000/api/core_spend?msisdn=${msisdn}`,
    {
      method: "get",
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  return res.json();
}

async function getPerformanceData(msisdn: string) {
  const res = await fetch(
    `http://localhost:3000/api/performance?msisdn=${msisdn}`,
    {
      method: "get",
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  return res.json();
}

async function getAgentData() {
  const res = await fetch(`http://localhost:3000/api/agent/me`, {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return res.json();
}

export default async function page({ searchParams }: HomeProps) {
  let agentName = "Agent";

  const msisdn = searchParams.msisdn!;

  const agentData: Agents = await getAgentData();
  const coreSpendData: Core_Spend = await getCoreSpendData(msisdn);
  const performanceData: Performance_Rankings = await getPerformanceData(
    msisdn
  );

  const [agent, coreSpend, performance] = await Promise.all([
    agentData,
    coreSpendData,
    performanceData,
  ]);

  const cardData = { coreSpend, performance };

  return (
    <div>
      <div className="flex p-8">
        <div className="w-2/3 mr-12 ml-4 ">
          <div className="text-econetBlue mb-4">
            <p>Home </p>
          </div>
          <p className="mb-8 text-econetBlue text-3xl font-bold">
            Welcome {agent.name}
          </p>

          <Card className=" bg-econetBlue text-econetWhite mb-4">
            <CardHeader>
              <CardTitle>Your E-Bucks Balance</CardTitle>
              <CardDescription className="text-econetWhite">
                Earn more with every Econet service
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <p className="text-4xl font-bold">
                {/* {coreSpendData?.WEEKLY_VALUE || "N/A"} */}
              </p>
              <p> Earn more E-Bucks to reach the next tier</p>
            </CardContent>
            <CardFooter>
              <p>THE LONG BAR</p>
            </CardFooter>
          </Card>

          <Cards spendData={{ coreSpend }} performanceData={{ performance }} />

          <Card className="mb-8">
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
          </Card>

          <Card>
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
          </Card>
        </div>

        <div className="w-1/3 flex flex-col gap-4">
          <Card>
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
          </Card>

          <Card>
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
          </Card>
        </div>
      </div>
    </div>
  );
}

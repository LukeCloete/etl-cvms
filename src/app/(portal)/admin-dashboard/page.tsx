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
export default function page() {
  return (
    <div>
      <div className="flex p-8">
        <div className="w-2/3 mr-12 ml-4 ">
          <div className="text-econetBlue mb-4">
            <p>Home </p>
          </div>
          <p className="mb-8 text-econetBlue text-3xl font-bold">
            Admin Dashboard
          </p>

          {/* First row of CARDS */}
          <div className="flex justify-center gap-4 mb-8">
            <DashboardCard
              title={"Total Daily Data of All Agents"}
              date={"date"}
              value={"100 MB"}
            ></DashboardCard>

            <DashboardCard
              title={"Total Daily SMS of All Agents"}
              date={"date"}
              value={"10 SMS"}
            ></DashboardCard>

            <DashboardCard
              title={"Total Daily Voice of All Agents"}
              date={"date"}
              value={"20 Mins"}
            ></DashboardCard>

            <DashboardCard
              title={"Weekly Cash-In of All Agents"}
              date={"date"}
              value={"200 LSL"}
            ></DashboardCard>

            <DashboardCard
              title={"Weekly Cash-Out of All Agents"}
              date={"date"}
              value={"100 LSL"}
            ></DashboardCard>
          </div>

          {/* Second row of CARDS */}
          <div className="flex justify-center gap-4 mb-8">
            <DashboardCard
              title={"Total E-Bucks "}
              date={"date"}
              value={"100 MB"}
            ></DashboardCard>

            <DashboardCard
              title={"Weekly Transactions "}
              date={"date"}
              value={"10 SMS"}
            ></DashboardCard>

            <DashboardCard
              title={"Weekly Value"}
              date={"date"}
              value={"20 Mins"}
            ></DashboardCard>

            <DashboardCard
              title={"Transaction Growth"}
              date={"date"}
              value={"200 LSL"}
            ></DashboardCard>

            <DashboardCard
              title={"Average Value per Transaction"}
              date={"date"}
              value={"100 LSL"}
            ></DashboardCard>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Popular Rewards</CardTitle>
              <CardDescription>
                View the most redeemed bundles this week
              </CardDescription>
            </CardHeader>
            <CardContent className="flex">
              {/* Below are the reward cards */}
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

          {/* Earning tips card  */}
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

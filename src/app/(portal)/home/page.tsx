import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
            Welcome Dennis
          </p>

          <Card className=" bg-econetBlue text-econetWhite mb-4">
            <CardHeader>
              <CardTitle>Your E-Bucks Balance</CardTitle>
              <CardDescription className="text-econetWhite">
                Earn more with every Econet service
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <p className="text-4xl">5 000</p>

              <p> Earn 1 000 more E-Bucks to reach the next tier</p>
            </CardContent>
            <CardFooter>
              <p>THE LONG BAR</p>
            </CardFooter>
          </Card>
          <div className="flex justify-center gap-4 mb-8">
            <Card className="rounded-xl">
              <CardHeader>
                <p>Total Daily Data</p>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg">100 MB</CardTitle>
              </CardContent>
            </Card>

            <Card className="rounded-xl">
              <CardHeader>
                <p>Total Daily SMS</p>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg"> 10 SMS</CardTitle>
              </CardContent>
            </Card>

            <Card className="rounded-xl">
              <CardHeader>
                <p>Total Daily Voice</p>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg">20 Mins</CardTitle>
              </CardContent>
            </Card>

            <Card className="rounded-xl">
              <CardHeader>
                <p>Weekly Cash-In</p>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg"> 200 LSL</CardTitle>
              </CardContent>
            </Card>

            <Card className="rounded-xl">
              <CardHeader>
                <p>Weekly Cash-Out</p>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg"> 100 LSL</CardTitle>
              </CardContent>
            </Card>
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex">Quick Actions</CardTitle>
              <CardDescription>
                Access your favourite features instantly
              </CardDescription>
            </CardHeader>
            {/* I made the height 32, not sure if i should do that */}
            <CardContent className=" flex h-32">
              <div className="bg-econetBlue text-econetWhite w-1/2 flex justify-center items-center align-items rounded-xl ">
                <p className="flex flex-col justify-center items-center ">
                  <CardSim />
                  Redeem Bundles
                </p>
              </div>
              <div className="w-1/2 flex justify-center items-center rounded-xl">
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
              {/* Below are the reward cards */}
              <Card className=" flex flex-col justify-center items-center">
                <CardHeader>
                  <CardTitle className="text-econetBlue flex flex-col">
                    <div className=" flex flex-col justify-center items-center rounded-full ">
                      <CardSim className="bg-blue-400 rounded-full" />
                      <p>Daily Bundle</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <p className="text-econetBlue">20 MB</p>
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
              <CardTitle className="flex text-econetBlue">
                <History />
                Your Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className=" flex">
              <div>
                <p>E-Bucks earned</p>
                <p>Call made - 12 min</p>
              </div>
              <p className="bg-econetBlue text-econetWhite ml-auto flex rounded-full justify-center items-center">
                +25 E-Bucks
              </p>
            </CardContent>
            <CardContent className=" flex">
              <div>
                <p>E-Bucks earned</p>
                <p>Call made - 16 min</p>
              </div>
              <p className="bg-econetBlue text-econetWhite ml-auto flex rounded-full justify-center items-center">
                +25 E-Bucks
              </p>
            </CardContent>
          </Card>

          {/* Earning tips card  */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Lightbulb />
                Earning tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>- Make calls to earn 5 E-Bucks per minute</p>
            </CardContent>
            <CardFooter>
              <p>- Use data to get bonus E-Bucks daily</p>
            </CardFooter>
            <CardFooter>
              <p>- Refer friends for 100 E-Bucks each</p>
            </CardFooter>
            <CardFooter>
              <p>- Complete monthly challenges for extra rewards</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

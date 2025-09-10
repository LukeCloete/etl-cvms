import DashboardCard from "@/components/DashboardCard";
import ProfileCard from "@/components/ProfileCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { History, Gift, CardSim, PhoneCall, Lightbulb } from "lucide-react";

export default function page() {
  return (
    <div>
      <div className="flex p-8 ">
        <div className="w-3/4 mr-12 ml-4 ">
          <div className="text-econetBlue mb-4">
            <p>Dashboard &gt; Agents &gt; AgentName</p>
          </div>
          <p className="text-econetBlue text-3xl font-bold">"AgentName"</p>
          <p className="mt-4 mb-8">View key information for "AgentName"</p>

          {/* CARDS */}
          <div className="flex justify-center gap-4 mb-8 ">
            <DashboardCard
              title={"Total Daily Data"}
              date={"date"}
              value={"100 MB"}
            ></DashboardCard>

            <DashboardCard
              title={"Total Daily SMS"}
              date={"date"}
              value={"10 SMS"}
            ></DashboardCard>

            <DashboardCard
              title={"Total Daily Voice"}
              date={"date"}
              value={"20 Mins"}
            ></DashboardCard>

            <DashboardCard
              title={"Weekly Cash-In"}
              date={"date"}
              value={"200 LSL"}
            ></DashboardCard>

            <DashboardCard
              title={"Weekly Cash-Out"}
              date={"date"}
              value={"100 LSL"}
            ></DashboardCard>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex pl-2">Recent Transactions</CardTitle>
              <CardDescription className="pl-2">
                Showing 3 of 3 transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Table>
                <TableHeader></TableHeader>
                <TableBody>
                  <TableRow className="flex justify-between border-2  border-solid p-2 mb-2 rounded-lg ">
                    <TableCell className="font-medium ">
                      <div className="flex space-x-4 ">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-6" />
                        </div>
                        <div>
                          <p className="font-bold">80 MB DAILY BUNDLE</p>
                          <p className="ml-auto">Redeemed at 08:32 24/08/25</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="rounded-full border-2 border-red-500 bg-red-100 px-6 py-3 text-red-700">
                        -200 E-Bucks
                      </p>
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between border-2  border-solid p-2 mb-2 rounded-lg ">
                    <TableCell className="font-medium ">
                      <div className="flex space-x-4 ">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <PhoneCall className="text-white size-6" />
                        </div>
                        <div>
                          <p className="font-bold">Voice Call - 8 Minutes</p>
                          <p className="ml-auto">Redeemed at 16:44 22/08/25</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="rounded-full border-2 border-green-500 bg-green-100 px-6 py-3 text-green-700">
                        +25 E-Bucks
                      </p>
                    </TableCell>
                  </TableRow>

                  <TableRow className="flex justify-between border-2  border-solid p-2 mb-2 rounded-lg ">
                    <TableCell className="font-medium ">
                      <div className="flex space-x-4 ">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <PhoneCall className="text-white size-6" />
                        </div>
                        <div>
                          <p className="font-bold">Voice Call - 12 Minutes</p>
                          <p className="ml-auto">Redeemed at 17:03 18/08/25</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="rounded-full border-2 border-green-500 bg-green-100 px-6 py-3 text-green-700">
                        +25 E-Bucks
                      </p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Profile card */}
        <ProfileCard
          name={"Agent Name"}
          tier={"Gold"}
          phoneNumber={"+266 123 4567"}
          memberSinceDate={"January 2025"}
        ></ProfileCard>
      </div>
    </div>
  );
}

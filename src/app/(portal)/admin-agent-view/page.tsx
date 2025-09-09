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
import { Bell, Shield, Calendar, Phone, User } from "lucide-react";

export default function page() {
  return (
    <div>
      <div className="flex p-8">
        <div className="w-3/4 mr-12 ml-4">
          <div className="text-econetBlue mb-4">
            <p>Dashboard &gt; Agents &gt; AgentName</p>
          </div>
          <p className="text-econetBlue text-3xl font-bold">"AgentName"</p>
          <p className="mt-4 mb-8">View key information for "AgentName"</p>

          {/* CARDS */}
          <div className="flex justify-center gap-4 mb-8">
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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex space-x-2">
                <div>
                  <Shield />
                </div>
                <div>Recent Transactions</div>
              </CardTitle>
              <CardDescription className="pl-1">
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col p-2 ">
                <div className="mb-4">
                  <p className="font-bold">Password</p>
                  <p>Last updated 2 months ago</p>
                </div>
                <div>
                  <p className="font-bold">Two-Factor Authentication</p>
                  <p>Add an extra layet of security</p>
                </div>
              </div>
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

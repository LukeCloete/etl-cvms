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
import DashboardCard from "@/components/DashboardCard";
import { History, Gift, CardSim, Lightbulb } from "lucide-react";
export default function page() {
  return (
    <div>
      <div className="flex p-8">
        <div className="w-full mr-4 ml-4 ">
          <div className="text-econetBlue mb-4">
            <p>Dashboard &gt; Agents</p>
          </div>
          <p className=" text-econetBlue text-3xl font-bold">Admin Dashboard</p>
          <p className="mt-4 mb-8">View and manage agent accounts</p>

          {/* First row of CARDS */}
          <div className="flex justify-center gap-4 mb-8">
            <DashboardCard
              title={"Total Agents"}
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

          {/* Agent List Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex">Agent List</CardTitle>
              <CardDescription className="">
                Manage agent accounts and view their activity
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Table className="border-2 border-solid border-gray-200 rounded-xl ">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Agent Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>E-Bucks Balance</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Agent Number 1
                    </TableCell>
                    <TableCell>+266 456 7896</TableCell>
                    <TableCell>5 000</TableCell>
                    <TableCell>Gold</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>...</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Agent Number 2
                    </TableCell>
                    <TableCell>+266 456 1234</TableCell>
                    <TableCell>4 000</TableCell>
                    <TableCell>Silver</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>...</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

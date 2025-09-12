import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PhoneCall } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Bell,
  LayoutPanelLeft,
  Funnel,
  TrendingUp,
  TrendingDown,
  CardSim,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPerformanceData } from "../home/page";
import { getAgentData } from "../home/page";
import { Agents, Core_Spend, Performance_Rankings } from "@/lib/definitions";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cookies } from "next/headers";
import TranTable from "./_components/TranTable";

interface HomeProps {
  searchParams: {
    msisdn?: string;
  };
}

async function getEbucksData(msisdn: string) {
  const res = await fetch(`http://localhost:3000/api/ebucks?msisdn=${msisdn}`, {
    method: "get",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return res.json();
}

export default async function page({ searchParams }: HomeProps) {
  // const [sorting, setSorting] = useState([]);
  // const [columnFilters, setColumnFilters] = useState([]);
  // const [columnVisibility, setColumnVisibility] = useState({});
  // const [rowSelection, setRowSelection] = useState({});

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   getSortedRowModel: getSortedRowModel(),
  //   onRowSelectionChange: setRowSelection,
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     rowSelection,
  //   },
  // });
  console.log("This is in the history page");
  const msisdn = searchParams.msisdn!;

  /* When i specify the data to be Performance_Rankings[] instead of any i get errors */
  const agentData = await getAgentData();
  const performanceData = await getPerformanceData(msisdn);
  const ebucksData = await getEbucksData(msisdn);

  const [agent, performance, ebucks] = await Promise.all([
    agentData,
    performanceData,
    ebucksData,
  ]);

  const activeMsisddn = agent.agent.msisdns.find(
    (m: any) => m.msisdn === parseInt(msisdn)
  );
  const currentEbucksBalance = activeMsisddn?.current_ebucks_balance || 0;

  const totalRedeemed = 1000;
  const remainingBalance = currentEbucksBalance - totalRedeemed;

  // console.log("This is the performance: ", performance);

  const cashInData = performance.performanceData.filter(
    (item: any) => item.txn_type === "CASHIN"
  );
  const cashOutData = performance.performanceData.filter(
    (item: any) => item.txn_type === "CASHOUT"
  );
  // console.log("Cash-In Data:", cashInData);
  // console.log("This is cashInData: ", cashInData);
  // console.log(cashInData.txn_week);
  /* Gather  */
  // console.log("-------------");
  // console.log(ebucks);

  // console.log("NEW LINE NEW LINE NEW LINE");
  // console.log(performance);

  return (
    <div>
      <div className="flex p-8">
        <div className="ml-4 mr-4 w-full">
          <div className="text-econetBlue mb-4">
            <p>Home &gt; History</p>
          </div>
          <p className="text-econetBlue text-3xl font-bold">
            Transaction History
          </p>
          <p className="mt-4 mb-8">
            Track your E-Bucks earnings and redemptions
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Card className="w-1/3">
              <CardContent className="flex justify-between ">
                <div className="flex flex-col space-y-1  mt-9">
                  <p className="font-bold">Total Earned</p>
                  <p className="text-green-500 text-2xl font-bold">
                    {currentEbucksBalance}
                  </p>
                  <p>E-Bucks</p>
                </div>
                <TrendingUp className="text-green-500 mt-16" />
              </CardContent>
            </Card>

            <Card className="w-1/3">
              <CardContent className="flex justify-between  ">
                <div className="flex flex-col space-y-1 mt-9">
                  <p className="font-bold">Total Redeemed</p>
                  <p className="text-red-500 text-2xl font-bold">
                    {totalRedeemed}
                  </p>
                  <p>E-Bucks</p>
                </div>
                <TrendingDown className="text-red-500 mt-16" />
              </CardContent>
            </Card>

            <Card className="w-1/3">
              <CardContent className="flex justify-between  ">
                <div className="flex flex-col space-y-1 mt-9">
                  <p className="font-bold">Current Balance</p>
                  <p className="text-blue-500 text-2xl font-bold">
                    {remainingBalance}
                  </p>
                  <p>E-Bucks</p>
                </div>
                <LayoutPanelLeft className="text-blue-500 mt-16" />
              </CardContent>
            </Card>
          </div>

          {/* Filter Transactions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex space-x-2">
                <div>
                  <Funnel />
                </div>
                <div>Filter Transactions</div>
              </CardTitle>
              <CardDescription className="pl-2">
                Search through your transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Label htmlFor="search" className="sr-only">
                  Search
                </Label>
                <input
                  id="search"
                  placeholder="Search Transactions..."
                  className="pl-8"
                />
              </form>
              {/* <div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="category">Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        name="category"
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent border-dashboardBackground mt-3 text-white  rounded-md ">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-dashboardBackground text-white">
                          <SelectItem value="home-equipment">
                            Home Equipment
                          </SelectItem>
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="gadgets">Gadgets</SelectItem>
                          <SelectItem value="it-networking">
                            IT/Networking
                          </SelectItem>
                          <SelectItem value="stationery">Stationery</SelectItem>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
            </CardContent>
          </Card>
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex pl-2">Recent Transactions</CardTitle>
              <CardDescription className="pl-2">
                Showing 3 of 3 transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <TranTable performanceData={performance} ebucksData={ebucks} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

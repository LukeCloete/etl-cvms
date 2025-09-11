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
export default function page() {
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
                  <p className="text-green-500 text-2xl font-bold">5 200</p>
                  <p>E-Bucks</p>
                </div>
                <TrendingUp className="text-green-500 mt-16" />
              </CardContent>
            </Card>

            <Card className="w-1/3">
              <CardContent className="flex justify-between  ">
                <div className="flex flex-col space-y-1 mt-9">
                  <p className="font-bold">Total Redeemed</p>
                  <p className="text-red-500 text-2xl font-bold">1 000</p>
                  <p>E-Bucks</p>
                </div>
                <TrendingDown className="text-red-500 mt-16" />
              </CardContent>
            </Card>

            <Card className="w-1/3">
              <CardContent className="flex justify-between  ">
                <div className="flex flex-col space-y-1 mt-9">
                  <p className="font-bold">Current Balance</p>
                  <p className="text-blue-500 text-2xl font-bold">5 000</p>
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
      </div>
    </div>
  );
}

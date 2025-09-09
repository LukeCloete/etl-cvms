import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
              <CardHeader>
                <CardTitle>Total Earned</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <p className="text-green-500 text-2xl">5 200</p>
                <TrendingUp className="text-green-500" />
              </CardContent>
              <CardFooter>
                <p>E-Bucks</p>
              </CardFooter>
            </Card>
            <Card className="w-1/3">
              <CardHeader>
                <CardTitle>Total Redeemed</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <p className="text-red-500 text-2xl">200</p>
                <TrendingDown className="text-red-500" />
              </CardContent>
              <CardFooter>
                <p>E-Bucks</p>
              </CardFooter>
            </Card>
            <Card className="w-1/3">
              <CardHeader>
                <CardTitle>Current Balance</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <p className="text-blue-500 text-2xl">5 000</p>
                <LayoutPanelLeft className="text-blue-500" />
              </CardContent>
              <CardFooter>
                <p>E-Bucks</p>
              </CardFooter>
            </Card>
          </div>

          {/* Filter Transactions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex">
                <Funnel />
                Filter Transactions
              </CardTitle>
              <CardDescription className="pl-2">
                Manage your account security settings
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
              <CardTitle className="flex">
                <Bell />
                Recent Transactions
              </CardTitle>
              <CardDescription className="pl-2">
                Choose how you want to receive notifications
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
                    <TableCell className="bg-econetBlue  text-econetWhite ml-auto flex rounded-full justify-center items-center">
                      <p>+25 E-Bucks</p>
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

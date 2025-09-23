"use client";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import {
  Bell,
  LayoutPanelLeft,
  Funnel,
  TrendingUp,
  TrendingDown,
  CardSim,
  PhoneCall,
} from "lucide-react";
import { BanknoteArrowUp } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function TranTable({ performanceData, ebucksData }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' or 'cashin'

  const performanceArray = performanceData.performanceData;
  const ebucksArray = ebucksData.ebucksData;

  // Combine both arrays into a single transactions array.
  const combinedData = [...performanceArray, ...ebucksArray];

  // Sort the combined data chronologically by a date property.
  // Using `$createdAt` as it seems to be available in both data structures.
  combinedData.sort((a, b) => {
    const dateA = new Date(a.txn_week || a.$createdAt).getTime();
    const dateB = new Date(b.txn_week || b.$createdAt).getTime();
    // Sort from newest to oldest
    return dateB - dateA;
  });

  // Use useEffect to update the filtered data whenever the search query changes
  useEffect(() => {
    const results = combinedData.filter((element: any) => {
      // Check for the search query
      const matchesSearch = JSON.stringify(element)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Check for the active filter
      let matchesFilter = true; // Start by assuming a match

      if (activeFilter === "cashin") {
        matchesFilter = element.txn_type === "CASHIN";
      } else if (activeFilter === "cashout") {
        // The opposite of CASHIN is considered a cash-out
        matchesFilter = element.txn_type !== "CASHIN";
      }
      // If activeFilter is "all", matchesFilter remains true

      return matchesSearch && matchesFilter;
    });
    setFilteredData(results);
  }, [searchQuery, activeFilter, combinedData]);

  // console.log("this is the combined data array of objects", combinedData);
  return (
    <div>
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
          <form className="flex items-center gap-2 justify-end">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <input
              id="search"
              placeholder="Search Transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={
                activeFilter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("cashin")}
              className={
                activeFilter === "cashin"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }
            >
              Cash-in
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("cashout")}
              className={
                activeFilter === "cashout"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }
            >
              Cash-out
            </button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex pl-2">Recent Transactions</CardTitle>
          <CardDescription className="pl-2">
            View your transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Table>
            <TableHeader></TableHeader>
            <TableBody>
              {filteredData.map((element: any) => {
                const isPerformanceData = "txn_type" in element;
                let txnType = "";
                let value = 0;
                let isCashIn = false;
                let icon = null;
                let currency = "";

                if (isPerformanceData) {
                  isCashIn = element.txn_type === "CASHIN";
                  txnType = element.txn_type;
                  value = Math.abs(element.weekly_value);
                  icon = isCashIn ? (
                    <BanknoteArrowUp className="text-white size-6" />
                  ) : (
                    <BanknoteArrowDown className="text-white size-6" />
                  );
                  currency = "LSL";
                } else {
                  // This is ebucksData
                  isCashIn = element.points_change > 0;
                  txnType = element.usage_type;
                  value = Math.abs(element.points_change);
                  currency = "E-Bucks";

                  // New conditional checks for specific usage types
                  if (element.usage_type === "SMS") {
                    icon = <Mail className="text-white size-6" />;
                  } else if (element.usage_type === "VOICE") {
                    icon = <PhoneCall className="text-white size-6" />;
                  } else if (element.usage_type === "DATA") {
                    icon = <CardSim className="text-white size-6" />;
                  } else {
                    icon = isCashIn ? (
                      <BanknoteArrowUp className="text-white size-6" />
                    ) : (
                      <BanknoteArrowDown className="text-white size-6" />
                    );
                  }
                }

                const ebucksClass = isCashIn
                  ? "rounded-full border-2 border-green-500 bg-green-100 px-6 py-3 text-green-700"
                  : "rounded-full border-2 border-red-500 bg-red-100 px-6 py-3 text-red-700";

                const transactionDateString = isPerformanceData
                  ? element.txn_week
                  : element.date;
                const transactionDate = new Date(transactionDateString);

                const formattedDate = transactionDate.toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                );

                const formattedTime = transactionDate.toLocaleTimeString(
                  "en-GB",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                return (
                  <TableRow
                    key={element.$id}
                    className="flex justify-between border-2 border-solid p-2 mb-2 rounded-lg"
                  >
                    <TableCell className="font-medium">
                      <div className="flex space-x-4">
                        <div className="bg-econetBlue px-2 py-1 rounded-xl border border-white/10 flex items-center justify-center">
                          {icon}
                        </div>
                        <div>
                          <div>
                            <p>
                              {txnType}{" "}
                              {isCashIn ? "Transaction" : "Transaction"}
                            </p>
                            <p className="font-bold">
                              {isCashIn ? "+" : "-"} {value} {currency}
                            </p>
                          </div>
                          <p className="ml-auto">
                            Transacted at {formattedTime} on {formattedDate}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Funnel, CardSim, PhoneCall, Mail } from "lucide-react";
import { BanknoteArrowUp } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Performance_Rankings, Ebucks_log } from "@/lib/definitions";
import { DateRange } from "react-day-picker";

type TranTableProps = {
  performanceData: {
    performanceData: Performance_Rankings[];
  };
  ebucksData: {
    ebucksData: Ebucks_log[];
  };
};

export default function TranTable({
  performanceData,
  ebucksData,
}: TranTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<
    (Performance_Rankings | Ebucks_log)[]
  >([]);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' or 'cashin'

  const combinedData = useMemo(() => {
    const performanceArray = performanceData.performanceData || [];
    const ebucksArray = ebucksData.ebucksData || [];

    // Combine both arrays into a single transactions array.
    const combined = [...performanceArray, ...ebucksArray];

    // Sort the combined data chronologically by a date property.
    // Using `$createdAt` as it seems to be available in both data structures.
    combined.sort((a, b) => {
      const dateA = new Date(
        "txn_week" in a
          ? (a as Performance_Rankings).txn_week
          : (a as Ebucks_log).$createdAt
      ).getTime();
      const dateB = new Date(
        "txn_week" in b
          ? (b as Performance_Rankings).txn_week
          : (b as Ebucks_log).$createdAt
      ).getTime();
      // Sort from newest to oldest
      return dateB - dateA;
    });

    return combined;
  }, [performanceData, ebucksData]);

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // Use useEffect to update the filtered data whenever the search query or date range changes
  useEffect(() => {
    const results = combinedData.filter((element) => {
      // Check for the search query
      const matchesSearch = JSON.stringify(element)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Check for the active filter
      let matchesFilter = true; // Start by assuming a match

      if (activeFilter === "cashin") {
        matchesFilter = "txn_type" in element && element.txn_type === "CASHIN";
      } else if (activeFilter === "cashout") {
        // The opposite of CASHIN is considered a cash-out
        matchesFilter = "txn_type" in element && element.txn_type !== "CASHIN";
      }

      // Check for the date range filter
      let matchesDateRange = true;
      if (dateRange?.from && dateRange?.to) {
        const transactionDateString =
          "txn_week" in element
            ? (element as Performance_Rankings).txn_week
            : (element as Ebucks_log).date;
        if (transactionDateString) {
          const transactionDate = new Date(transactionDateString);
          matchesDateRange =
            transactionDate >= dateRange.from &&
            transactionDate <= dateRange.to;
        }
      }

      return matchesSearch && matchesFilter && matchesDateRange;
    });
    setFilteredData(results);
  }, [searchQuery, activeFilter, combinedData, dateRange]);

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
          <CardDescription className="pl-2 ">
            Search through your transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex items-center gap-2 w-full ">
            <Label htmlFor="search" className="sr-only  ">
              Search
            </Label>
            <input
              id="search"
              placeholder="Search Transactions..."
              className="pl-8 w-full border border-gray-300 rounded-lg py-2 "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <DatePickerWithRange onDateChange={setDateRange} />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveFilter("all");
              }}
              className={`font-bold py-2 px-6 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 whitespace-nowrap ${
                activeFilter === "all"
                  ? "bg-econetBlue text-white rounded-full shadow-lg"
                  : "text-gray-800"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveFilter("cashin");
              }}
              className={`font-bold py-2 px-6 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 whitespace-nowrap ${
                activeFilter === "cashin"
                  ? "bg-econetBlue text-white rounded-full shadow-lg"
                  : "text-gray-800"
              }`}
            >
              Cash-in
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveFilter("cashout");
              }}
              className={`font-bold py-2 px-6 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 whitespace-nowrap ${
                activeFilter === "cashout"
                  ? "bg-econetBlue text-white rounded-full shadow-lg"
                  : "text-gray-800"
              }`}
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
              {filteredData.map((element) => {
                const isPerformanceData =
                  "txn_type" in element &&
                  (element as Performance_Rankings).txn_type !== undefined;
                let txnType = "";
                let value = 0;
                let isCashIn = false;
                let icon = null;
                let currency = "";

                if (isPerformanceData) {
                  const performanceElement = element as Performance_Rankings;
                  isCashIn = performanceElement.txn_type === "CASHIN";
                  txnType = performanceElement.txn_type;
                  value = Math.abs(performanceElement.weekly_value);
                  icon = isCashIn ? (
                    <BanknoteArrowUp className="text-white size-6" />
                  ) : (
                    <BanknoteArrowDown className="text-white size-6" />
                  );
                  currency = "M";
                } else {
                  const ebucksElement = element as Ebucks_log;
                  // This is ebucksData
                  isCashIn = ebucksElement.points_change > 0;
                  txnType = ebucksElement.usage_type;
                  value = Math.abs(ebucksElement.points_change);
                  currency = "E-Bucks";

                  // New conditional checks for specific usage types
                  if (ebucksElement.usage_type === "SMS") {
                    icon = <Mail className="text-white size-6" />;
                  } else if (ebucksElement.usage_type === "VOICE") {
                    icon = <PhoneCall className="text-white size-6" />;
                  } else if (ebucksElement.usage_type === "DATA") {
                    icon = <CardSim className="text-white size-6" />;
                  } else {
                    icon = isCashIn ? (
                      <BanknoteArrowUp className="text-white size-6" />
                    ) : (
                      <BanknoteArrowDown className="text-white size-6" />
                    );
                  }
                }

                // const ebucksClass = isCashIn
                //   ? "rounded-full border-2 border-green-500 bg-green-100 px-6 py-3 text-green-700"
                //   : "rounded-full border-2 border-red-500 bg-red-100 px-6 py-3 text-red-700";

                const transactionDateString = isPerformanceData
                  ? (element as Performance_Rankings).txn_week
                  : (element as Ebucks_log).date;
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
                              {isCashIn ? "+" : "-"} {currency}{" "}
                              {value.toLocaleString("sv-SE")}
                            </p>
                          </div>
                          <p className="ml-auto">
                            Transaction took place at {formattedTime} on{" "}
                            {formattedDate}
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

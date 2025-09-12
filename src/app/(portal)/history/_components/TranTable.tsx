import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function TranTable({ performanceData, ebucksData }: any) {
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

  //   console.log("this is the combined data array of objects", combinedData);
  return (
    <Table>
      <TableHeader></TableHeader>
      <TableBody>
        {combinedData.map((element: any) => {
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

          const formattedDate = transactionDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          const formattedTime = transactionDate.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });

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
                        {txnType} {isCashIn ? "Transaction" : "Transaction"}
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
  );
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function TranTable(performanceData: any, ebucksData: any) {
  console.log("this is in the tranTable");
  console.log(ebucksData);
  console.log(ebucksData);
  //   console.log(performanceData.performanceData.performanceData);
  const data = performanceData?.performanceData?.performanceData;
  const ebucks = ebucksData?.ebucksData?.ebucksData;
  //   console.log(ebucksData);
  //   data.forEach((element: any) => {
  //     console.log(element.txn_type);
  //   });
  return (
    <Table>
      <TableHeader></TableHeader>
      <TableBody>
        {data.map((element: any) => {
          const isCashIn = element.txn_type === "CASHIN";
          const icon = isCashIn ? (
            <BanknoteArrowUp className="text-white size-6" />
          ) : (
            <BanknoteArrowDown className="text-white size-6" />
          );
          const ebucksValue = `${isCashIn ? "+" : "-"}${Math.abs(
            element.performance_score
          )} E-Bucks`;
          const ebucksClass = isCashIn
            ? "rounded-full border-2 border-green-500 bg-green-100 px-6 py-3 text-green-700"
            : "rounded-full border-2 border-red-500 bg-red-100 px-6 py-3 text-red-700";

          // Step 1: Create a Date object from the txn_week string
          const transactionDate = new Date(element.txn_week);

          // Step 2: Format the date to a human-readable string
          const formattedDate = transactionDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          // Step 3: Format the time
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
                  <div className="bg-econetBlue p-2 py-1 rounded-xl border border-white/10 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <div>
                      <p>
                        {element.txn_type}{" "}
                        {isCashIn ? "Transaction" : "Transaction"}
                      </p>
                      <p className="font-bold">
                        {isCashIn ? "+" : "-"} {Math.abs(element.weekly_value)}{" "}
                        LSL
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

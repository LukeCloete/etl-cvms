"use client";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Funnel } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function TranTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' or 'cashin'
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const processedData = useMemo(() => {
    const result: TData[] = [];
    data.forEach((originalRow: any) => {
      // Create a record for cash-in if it exists and is not zero
      if (
        originalRow.week_total_cashin_value &&
        originalRow.week_total_cashin_value > 0
      ) {
        result.push({ ...originalRow, transaction_type: "cashin" });
      }
      // Create a separate record for cash-out if it exists and is not zero
      if (
        originalRow.week_total_cashout_value &&
        originalRow.week_total_cashout_value > 0
      ) {
        result.push({
          ...originalRow,
          transaction_type: "cashout",
        });
      }
    });
    return result;
  }, [data]);

  const table = useReactTable({
    data: processedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const lowercasedFilter = filterValue.toLowerCase();
      const normalizedFilter = lowercasedFilter.replace(/[\s-]/g, "");

      // If the normalized search is 'cashin' or 'cashout', only check against transaction type
      if (normalizedFilter === "cashin" || normalizedFilter === "cashout") {
        const transactionType = (
          row.getValue("transaction_type") as string
        ).toLowerCase();
        return transactionType === normalizedFilter;
      }

      // For all other searches, check against all relevant columns
      const dateValue = row.getValue("week_end_date");
      const date = new Date(dateValue as string);
      const formattedDateShort = date
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
        .toLowerCase();
      const formattedDateLong = date
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })
        .toLowerCase();
      const value = String(row.getValue("value")).toLowerCase();
      const count = String(row.getValue("count")).toLowerCase();

      return (
        formattedDateShort.includes(lowercasedFilter) ||
        formattedDateLong.includes(lowercasedFilter) ||
        value.includes(lowercasedFilter) ||
        count.includes(lowercasedFilter)
      );
    },
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection,
    },
  });

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    const transactionTypeColumn = table.getColumn("transaction_type");

    if (transactionTypeColumn) {
      if (activeFilter === "all") {
        transactionTypeColumn.setFilterValue(undefined); // Clear the filter
      } else {
        transactionTypeColumn.setFilterValue(activeFilter); // Set filter to 'cashin' or 'cashout'
      }
    }
  }, [activeFilter, table]);

  useEffect(() => {
    const dateColumn = table.getColumn("week_end_date");
    if (dateColumn) {
      if (dateRange?.from && dateRange?.to) {
        // Set the filter to be an array [startDate, endDate]
        dateColumn.setFilterValue([dateRange.from, dateRange.to]);
      } else {
        // Clear the filter if no date range is selected
        dateColumn.setFilterValue(undefined);
      }
    }
  }, [dateRange, table]);

  // console.log(data);
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
            <Input
              placeholder="Search all columns..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
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
          <div className="rounded-md border overflow-x-auto max-w-full max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="px-2 bg-background text-foreground/70"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id} // <-- Uses the unique row ID generated by TanStack Table
                      data-state={row.getIsSelected() && "selected"}
                      className={cn(
                        "hover:bg-gray-800",
                        row.getIsSomeSelected() && "bg-foreground/20",
                        "border-[1px] border-foreground/20 hover:bg-foreground/10 cursor-pointer "
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id} // <-- Uses the unique cell ID generated by TanStack Table
                          className="text-foreground text-left focus:bg-foreground/10 py-1"
                        >
                          {/* flexRender uses the 'cell' definition from your columns.ts file */}
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

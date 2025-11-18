"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
export type Transaction = {
  week_total_cashin_value: number;
  week_total_cashout_value: number;
  week_total_cashin_count: number;
  week_total_cashout_count: number;
  week_end_date: string;
  transaction_type: "cashin" | "cashout";
};
export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transaction_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.transaction_type;
      const isCashIn = type === "cashin";
      const text = isCashIn ? "Cash In" : "Cash Out";
      return <div>{text}</div>;
    },
  },
  {
    // A composite accessorKey isn't needed if we use a custom cell renderer
    id: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) =>
      row.transaction_type === "cashin"
        ? row.week_total_cashin_value
        : row.week_total_cashout_value,
    cell: ({ row }) => {
      const isCashIn = row.original.transaction_type === "cashin";
      const value = isCashIn
        ? row.original.week_total_cashin_value
        : row.original.week_total_cashout_value;

      return <div>{value}</div>;
    },
  },
  {
    id: "count",
    sortingFn: "alphanumeric",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) =>
      row.transaction_type === "cashin"
        ? row.week_total_cashin_count
        : row.week_total_cashout_count,
    cell: ({ row }) => {
      const isCashIn = row.original.transaction_type === "cashin";
      const count = isCashIn
        ? row.original.week_total_cashin_count
        : row.original.week_total_cashout_count;

      return <div>{count}</div>;
    },
  },
  {
    accessorKey: "week_end_date", // This is the column we are filtering
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date & Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const date = new Date(row.getValue(columnId));
      const [start, end] = filterValue as Date[];

      // Adjust the end date to include the entire day
      const adjustedEnd = new Date(end);
      adjustedEnd.setHours(23, 59, 59, 999);

      return date >= start && date <= adjustedEnd;
    },
    cell: ({ row }) => {
      // Use week_end_date and format it
      const date = new Date(row.original.week_end_date);
      return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    },
  },
];

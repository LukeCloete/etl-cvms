"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Item = {
  // Assuming these properties exist on your data object
  week_end_date: string;
  transaction_type: "cashin" | "cashout";
  week_total_cashin_value: number;
  week_total_cashout_value: number;
  week_total_cashin_count: number;
  week_total_cashout_count: number;
  $createdAt: string;
};

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "transaction_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.transaction_type;
      const isCashIn = type === "cashin";
      const color = isCashIn ? "text-green-500" : "text-red-500";
      const text = isCashIn ? "Cash In" : "Cash Out";
      return <div className={color}>{text}</div>;
    },
  },
  {
    // A composite accessorKey isn't needed if we use a custom cell renderer
    accessorKey: "value",
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
    cell: ({ row }) => {
      const isCashIn = row.original.transaction_type === "cashin";
      const value = isCashIn
        ? row.original.week_total_cashin_value
        : row.original.week_total_cashout_value;

      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "count",
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
    cell: ({ row }) => {
      const isCashIn = row.original.transaction_type === "cashin";
      const count = isCashIn
        ? row.original.week_total_cashin_count
        : row.original.week_total_cashout_count;

      return <div>{count}</div>;
    },
  },
  {
    accessorKey: "$createdAt",
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

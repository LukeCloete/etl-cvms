"use client";

import { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import Cards from "./Cards";
import { Core_Spend, Performance_Rankings } from "@/lib/definitions";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type FilterPeriod = "today" | "yesterday" | "custom";

const LOCAL_STORAGE_KEY = "dashboardFilterPeriod";

interface FilteredCardsProps {
  initialCoreSpend: Core_Spend[];
  initialPerformance: Performance_Rankings[];
}

export default function FilteredCards({
  initialCoreSpend,
  initialPerformance,
}: FilteredCardsProps) {
  const [period, setPeriod] = useState<FilterPeriod>("today"); // 'today', 'yesterday', or 'custom'
  const [customDate, setCustomDate] = useState<Date | undefined>(new Date());

  // This effect runs once on the client after the component mounts.
  // It reads the saved period from localStorage and updates the state.
  useEffect(() => {
    const savedPeriod = localStorage.getItem(LOCAL_STORAGE_KEY) as FilterPeriod;
    if (savedPeriod) {
      setPeriod(savedPeriod);
    }
  }, []); // The empty dependency array ensures this runs only once.

  // This effect runs whenever the 'period' state changes.
  // It saves the new period to localStorage.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, period);
  }, [period]);

  // Helper to get a date string in 'YYYY-MM-DD' format
  const getDayString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const filteredCoreSpend = useMemo(() => {
    if (!initialCoreSpend) return null;

    const today = new Date();
    let targetDateStr: string;

    if (period === "today") {
      targetDateStr = getDayString(today);
    } else if (period === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      targetDateStr = getDayString(yesterday);
    } else if (period === "custom") {
      if (!customDate) {
        return null; // No custom date selected
      }
      targetDateStr = getDayString(customDate);
    } else {
      // Fallback for any other case
      return initialCoreSpend.length > 0 ? initialCoreSpend[0] : null;
    }

    // Find the coreSpend item that matches the target date
    return (
      initialCoreSpend.find(
        (item) => getDayString(new Date(item.date)) === targetDateStr
      ) || null
    );
  }, [initialCoreSpend, period, customDate]);

  const filteredPerformance = useMemo(() => {
    if (!initialPerformance) return [];

    const today = new Date();
    let targetDate = new Date();

    if (period === "yesterday") {
      targetDate.setDate(today.getDate() - 1);
    } else if (period === "custom") {
      if (!customDate) {
        return []; // Or handle as you see fit when no custom date is selected
      }
      targetDate = customDate;
    }

    const targetDateStr = getDayString(targetDate);
    return initialPerformance.filter(
      (item) => getDayString(new Date(item.txn_week)) === targetDateStr
    );
  }, [initialPerformance, period, customDate]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCustomDate(date);
      setPeriod("custom");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <ToggleGroup
          type="single"
          value={period}
          onValueChange={(value: FilterPeriod) => {
            if (value) setPeriod(value);
          }}
          variant="outline"
          className="justify-start"
        >
          <ToggleGroupItem value="today">Today</ToggleGroupItem>
          <ToggleGroupItem value="yesterday">Yesterday</ToggleGroupItem>
        </ToggleGroup>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-[280px] justify-start text-left font-normal ${
                period !== "custom" && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {customDate ? (
                format(customDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={customDate}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Cards coreSpend={filteredCoreSpend} performance={filteredPerformance} />
    </div>
  );
}

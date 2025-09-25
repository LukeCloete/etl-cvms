"use client";
import { CardContent } from "@/components/ui/card";
export default function DashboardCard({
  eventName,
  reasonForEvent,
  eBucksValue,
}: {
  eventName: string;
  reasonForEvent: string;
  eBucksValue: string;
}) {
  return (
    <CardContent className="flex">
      <div>
        <p className="font-bold">{eventName}</p>
        <p>{reasonForEvent}</p>
      </div>
      <p className="bg-econetBlue p-2 text-econetWhite ml-auto flex rounded-full justify-center items-center">
        {eBucksValue}
      </p>
    </CardContent>
  );
}

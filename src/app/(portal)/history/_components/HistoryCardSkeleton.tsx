import { Card, CardContent, CardHeader } from "@/components/ui/card";

function HistoryCardSkeleton() {
  return (
    <Card className="w-1/3">
      {/* Removing CardHeader/Content outside placeholders for cleaner matching */}

      {/* CardContent must have the flex layout to match the original */}
      <CardContent className="flex justify-between">
        {/* Left Column: Matches flex-col space-y-1 mt-9 */}
        <div className="flex flex-col space-y-1 mt-9">
          {/* Placeholder for Title (h-4 for standard text) */}
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />

          {/* Placeholder for Balance Number (h-8 for text-2xl) */}
          <div className="h-8 w-32 bg-gray-300 rounded animate-pulse" />

          {/* Placeholder for "E-Bucks" label */}
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Right Icon Placeholder: Mimics the size and mt-16 of the icon */}
        <div className="h-6 w-6 bg-gray-200 rounded-full mt-16 animate-pulse" />
      </CardContent>
    </Card>
  );
}

export default function CardsSkeleton() {
  return (
    // This div must match the parent of your original cards exactly.
    // It should ONLY contain the three skeleton cards.
    <div className="flex justify-center gap-4 mb-8">
      {/* We render THREE skeletons to match the three original cards in the row */}
      <HistoryCardSkeleton />
      <HistoryCardSkeleton />
      <HistoryCardSkeleton />
    </div>
  );
}

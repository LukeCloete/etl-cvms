import { Card, CardContent, CardHeader } from "@/components/ui/card";

function DashboardCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

export default function CardsSkeleton() {
  return (
    <div className="flex flex-col">
      {/* ROW OF CARDS OF MISC DATA */}
      <div className="flex justify-center gap-4 mb-8">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
      {/* ROW OF CARDS FOR CASH IN */}
      <div className="flex justify-center gap-4 mb-8">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
      {/* CASH OUT CARDS */}
      <div className="flex justify-center gap-4 mb-8">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
    </div>
  );
}

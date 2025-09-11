"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function DashboardCard({
  EBucksBalance,
  currentTier,
  nextTier,
}: {
  EBucksBalance: number;
  currentTier: string;
  nextTier: string;
}) {
  return (
    <Card className=" bg-econetBlue text-econetWhite mb-4">
      <CardHeader>
        <CardTitle>Your E-Bucks Balance</CardTitle>
        <CardDescription className="text-econetWhite">
          Earn more with every Econet service
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <p className="text-4xl font-bold">{EBucksBalance}</p>

        <p> Earn 1 000 more E-Bucks to reach the next tier</p>
      </CardContent>
      <CardFooter>
        {currentTier}
        <p>THE LONG BAR</p>
        {nextTier}
      </CardFooter>
    </Card>
  );
}

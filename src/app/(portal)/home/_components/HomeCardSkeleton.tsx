import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function HomeCardSkeleton() {
  return (
    <Card className="bg-econetBlue text-econetWhite">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="tracking-wide">Your E-Bucks Balance</CardTitle>
          <CardTitle className="tracking-wide">Your Performance Score</CardTitle>
        </div>
        <div className="flex flex-row justify-between items-center">
          <CardDescription className="text-white/80 text-sm">
            Earn more with every use of EcoCash services
          </CardDescription>
          <CardDescription className="text-white/80 text-sm">
            Your score is based on your weekly transactions
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-8">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col items-start">
            <div className="h-10 w-48 bg-white/20 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="flex flex-col items-end">
            <div className="h-10 w-24 bg-white/20 rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <div className="h-6 w-20 bg-white/20 rounded animate-pulse" />
        <Progress value={0} />
        <div className="h-6 w-20 bg-white/20 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}

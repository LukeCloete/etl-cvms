import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Phone, Calendar, Badge } from "lucide-react";
import { Landmark } from "lucide-react";
export default function RewardProfileCard({
  eBucksBalance,
}: {
  eBucksBalance: string;
}) {
  return (
    <Card className="bg-econetBlue text-econetWhite p-2 rounded-lg flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Landmark />
          Your points
        </CardTitle>
        <CardDescription className="text-econetWhite">
          Earn more with every Econet service
        </CardDescription>
      </CardHeader>
      <CardContent className=" flex">
        <div className="text-4xl font-bold">
          <p>{eBucksBalance}</p>
        </div>
      </CardContent>
      <CardContent className=" flex">
        <div className="">
          <p>THIS WILL BE THE BAR</p>
        </div>
      </CardContent>
      <CardContent className=" flex space-x-2">
        <CardDescription className="text-econetWhite">
          Earn 1 000 more E-Bucks to reach the next tier
        </CardDescription>
      </CardContent>
    </Card>
  );
}

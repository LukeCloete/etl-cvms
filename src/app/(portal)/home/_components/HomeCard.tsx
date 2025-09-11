import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function HomeCard() {
  return (
    <Card className=" bg-econetBlue text-econetWhite mb-4">
      <CardHeader>
        <CardTitle>Your E-Bucks Balance</CardTitle>
        <CardDescription className="text-econetWhite">
          Earn more with every Econet service
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <p className="text-4xl font-bold">
          {/* {coreSpendData?.WEEKLY_VALUE || "N/A"} */}
        </p>
        <p> Earn more E-Bucks to reach the next tier</p>
      </CardContent>
      <CardFooter>
        <Progress value={60} />
      </CardFooter>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";

const recentActivities = [
  {
    id: 1,
    date: new Date(),
    usage_type: "DATA",
    points_change: 200,
    usage: 20,
  },
  {
    id: 2,
    date: new Date(),
    usage_type: "VOICE",
    points_change: 120,
    usage: 12,
  },
  {
    id: 2,
    date: new Date(),
    usage_type: "SMS",
    points_change: 34,
    usage: 34,
  },
];

export default function RecentActivity(ebucksLog: any) {
  console.log("ebucks log", ebucksLog);
  console.log(ebucksLog.ebucksLog.ebucksData[0].usage_type);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex space-x-2 text-econetBlue ">
          <div>
            <History />
          </div>
          <h2>Your Recent Activity</h2>
        </CardTitle>
      </CardHeader>
      {recentActivities.map((activity) => (
        <CardContent className="flex flex-col gap-2" key={activity.id}>
          <div
            key={activity.id}
            className="flex flex-row justify-between items-center w-full py-2"
          >
            <div>
              <p className="font-bold">E-Bucks Earned</p>
              <p className="text-black/80">
                {activity.usage_type} - {activity.usage} min
              </p>
            </div>
            <Badge className="bg-econetBlue text-econetWhite text-sm font-semibold">
              +{activity.points_change} E-Bucks
            </Badge>
          </div>
        </CardContent>
      ))}
    </Card>
  );
}

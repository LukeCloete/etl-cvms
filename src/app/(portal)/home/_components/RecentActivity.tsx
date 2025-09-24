import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Ebucks_log } from "@/lib/definitions";
import { History } from "lucide-react";

interface RecentActivityProps {
  ebucksLog: {
    ebucksData: Ebucks_log[];
  };
}

export default function RecentActivity({ ebucksLog }: RecentActivityProps) {
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
      {ebucksLog.ebucksData.map((activity) => (
        <CardContent className="flex flex-col gap-2" key={activity.$id}>
          <div
            key={activity.$id}
            className="flex flex-row justify-between items-center w-full py-2"
          >
            <div>
              <p className="font-bold">E-Bucks Earned</p>
              <p className="text-black/80">{activity.usage_type}</p>
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

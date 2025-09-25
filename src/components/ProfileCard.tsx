import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Calendar } from "lucide-react";
export default function DashboardCard({
  name,
  tier,
  phoneNumber,
  memberSinceDate,
}: {
  name: string;
  tier: string;
  phoneNumber: string;
  memberSinceDate: string;
}) {
  return (
    <div className="w-1/4 flex flex-col gap-4 mr-4">
      <Card className="bg-econetBlue text-econetWhite p-4 rounded-lg flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle className="flex flex-col items-center justify-center gap-2">
            <User />
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent className=" flex">
          <div className="rounded-full border-2 border-amber-500 bg-amber-100 px-6 py-1 text-amber-700">
            <p>{tier}</p>
          </div>
        </CardContent>
        <CardContent className="flex space-x-2">
          <div>
            <Phone />
          </div>
          <div>
            <p>{phoneNumber}</p>
          </div>
        </CardContent>
        <CardContent className=" flex space-x-2">
          <div>
            <Calendar />
          </div>
          <div>
            <p>Memeber since {memberSinceDate}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

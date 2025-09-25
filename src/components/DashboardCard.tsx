import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function DashboardCard({
  title,
  date,
  value,
}: {
  title: string;
  date: string;
  value: string;
}) {
  return (
    <Card className="rounded-xl w-1/5">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-xs ">
          Last updated as of {date}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-xl">{value}</p>
      </CardContent>
    </Card>
  );
}

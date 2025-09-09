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
        <p>{title}</p>
        <CardDescription>Last updated as of: {date}</CardDescription>
      </CardHeader>

      <CardContent>
        <CardTitle className="text-lg">{value}</CardTitle>
      </CardContent>
    </Card>
  );
}

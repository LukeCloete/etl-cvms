import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PercentageCard({
  title,
  date,
  value,
}: {
  title: string;
  date: string;
  value: number | string | null | undefined;
}) {
  const numValue = value === null || value === undefined 
    ? 0 
    : typeof value === "string" 
      ? parseFloat(value) 
      : value;

  const isPositive = numValue > 0;
  const isNegative = numValue < 0;
  const colorClass = isPositive 
    ? "text-green-600" 
    : isNegative 
      ? "text-red-600" 
      : "text-gray-600";
  
  const sign = isPositive ? "+" : "";
  const displayValue = isNaN(numValue) ? "0" : numValue;

  return (
    <Card className="rounded-xl w-1/5">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-xs">
          Last updated as of {date}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className={`text-xl font-bold ${colorClass}`}>
          {sign}{displayValue} %
        </p>
      </CardContent>
    </Card>
  );
}

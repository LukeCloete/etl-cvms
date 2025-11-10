import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent_Weekly_Performance } from "@/lib/definitions";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function PerformanceCard({
  title,
  value,
  description,
  lastUpdated,
}: {
  title: string;
  value: string;
  description?: string;
  lastUpdated?: Date;
}) {
  return (
    <TooltipProvider>
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <CardTitle className=" whitespace-nowrap">{title}</CardTitle>
            {description && (
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl ">{value}</p>
        </CardContent>
        {lastUpdated && (
          <CardFooter className="flex items-end justify-start">
            <p className="text-xs text-gray-500">
              Last Updated: {format(new Date(lastUpdated), "dd MMM yyyy")}
            </p>
          </CardFooter>
        )}
      </Card>
    </TooltipProvider>
  );
}

export function WeeklyPerformance({
  weeklyPerformanceData,
}: {
  weeklyPerformanceData: Agent_Weekly_Performance[] | null;
}) {
  const performance = weeklyPerformanceData?.[0];

  return (
    <Tabs defaultValue="last-7-days">
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="last-7-days">Last 7 Days</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        <p>Today&apos;s data is not yet available.</p>
      </TabsContent>
      <TabsContent value="last-7-days">
        {performance ? (
          <>
            <div className="flex flex-col gap-16 py-4">
              <div className="items-start flex flex-col gap-4">
                <div className="flex gap-4">
                  <h3 className="text-xl font-medium">Overall Performance</h3>{" "}
                  <Badge className="text-sm bg-blue-100 border border-blue-200 shadow-sm text-blue-500 hover:bg-blue-200">
                    {performance.suggestion_week_overall}
                  </Badge>
                </div>
                <div className="w-full h-[2px] bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                <div className="flex gap-2">
                  <PerformanceCard
                    title="Rank"
                    description="Your Overall Performance Rank This Week"
                    value={`#${performance.rank_week_overall_value}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Value Target"
                    description="Value Needed to Surpass Next Agent"
                    value={`M ${performance.value_to_surpass_next_agent_overall.toLocaleString()}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Transactions Target"
                    description="Transactions Needed to Surpass Next Agent"
                    value={`${performance.txns_to_surpass_next_agent_overall.toLocaleString()}`}
                    lastUpdated={performance.$updatedAt}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <h3 className="text-xl font-medium text-teal-500">
                    Cash-In Performance
                  </h3>
                  <Badge className="text-sm bg-teal-100 border border-teal-200 shadow-sm text-teal-500 hover:bg-teal-200">
                    {performance.suggestion_week_cashin}
                  </Badge>
                </div>
                <div className="w-full h-[2px] bg-gradient-to-r from-teal-500/20 to-transparent"></div>

                <div className="flex gap-2">
                  <PerformanceCard
                    title="Cash-In Rank"
                    description="Your Cash-In Performance Rank This Week"
                    value={`#${performance.rank_week_cashin_value}`}
                    lastUpdated={performance.$updatedAt}
                  />

                  <PerformanceCard
                    title="Total Cash-In"
                    value={`M ${performance.week_total_cashin_value.toLocaleString()}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Cash-In Transactions"
                    value={`${performance.week_total_cashin_count}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Average Cash-In Value"
                    value={`M ${performance.current_week_avg_cashin_value.toLocaleString()}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Value Target"
                    description="Cash-In Value Needed to Surpass Next Agent"
                    value={`M ${performance.value_to_surpass_next_agent_cashin.toLocaleString()}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Transactions Target"
                    description="Cash-In Transactions Needed to Surpass Next Agent"
                    value={`${performance.txns_to_surpass_next_agent_cashin.toLocaleString()}`}
                    lastUpdated={performance.$updatedAt}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <h3 className="text-xl font-medium text-amber-500">
                    Cash-Out Performance
                  </h3>
                  <Badge className="text-sm bg-amber-100 border border-amber-200 shadow-sm text-amber-500 hover:bg-amber-200">
                    {performance.suggestion_week_cashout}
                  </Badge>
                </div>
                <div className="w-full h-[2px] bg-gradient-to-r from-amber-500/20 to-transparent"></div>
                <div className="flex gap-2">
                  <PerformanceCard
                    title="Cash-Out Rank"
                    description="Your Cash-Out Performance Rank This Week"
                    value={`#${performance.rank_week_cashout_value}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Total Cash-Out"
                    value={`M ${performance.week_total_cashout_value.toLocaleString()}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Cash-Out Transactions"
                    value={`${performance.week_total_cashout_count}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Average Cash-Out Value"
                    value={`M ${performance.current_week_avg_cashout_value.toLocaleString()}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Value Target"
                    description="Cash-Out Value Needed to Surpass Next Agent"
                    value={`M ${performance.value_to_surpass_next_agent_cashout.toLocaleString()}`}
                    lastUpdated={performance.$updatedAt}
                  />
                  <PerformanceCard
                    title="Transactions Target"
                    description="Cash-Out Transactions Needed to Surpass Next Agent"
                    value={`${performance.txns_to_surpass_next_agent_cashout.toLocaleString()}`}
                    lastUpdated={performance.$updatedAt}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium mb-2 text-violet-500">
                  Average Performance
                </h3>
                <div className="w-full h-[2px] bg-gradient-to-r from-violet-500/20 to-transparent"></div>

                <PerformanceCard
                  title="Average Combined Value"
                  value={`M ${performance.current_week_avg_combined_value.toLocaleString()}`}
                  lastUpdated={performance.$updatedAt}
                />
              </div>
            </div>
          </>
        ) : (
          <p>No weekly performance data available.</p>
        )}
      </TabsContent>
    </Tabs>
  );
}

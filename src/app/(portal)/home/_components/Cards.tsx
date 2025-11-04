import DashboardCard from "@/components/DashboardCard";
import PercentageCard from "./PercentageCard";
import { Core_Spend, Performance_Rankings } from "@/lib/definitions";

interface CardsProps {
  coreSpend: Core_Spend | null;
  performance: Performance_Rankings[] | null;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "";
  }
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) {
    return "0";
  }
  // return value.toLocaleString("en-US");
  return value.toLocaleString("sv-SE");
};

export default function Cards({ coreSpend, performance }: CardsProps) {
  const sortedPerformanceData: Performance_Rankings[] = performance
    ? [...performance].sort((a, b) => {
        return new Date(b.txn_week).getTime() - new Date(a.txn_week).getTime();
      })
    : [];

  const mostRecentCashIn = sortedPerformanceData.find(
    (item) => item.txn_type === "CASHIN"
  );
  const mostRecentCashOut = sortedPerformanceData.find(
    (item) => item.txn_type === "CASHOUT"
  );

  return (
    <div className="flex flex-col gap-8">
      {/* CORE USAGE SECTION */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-econetBlue">
            Core Usage Metrics
          </h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-econetBlue/20 to-transparent"></div>
        </div>
        <div className="flex justify-center gap-4">
          <PercentageCard
            title={"Transaction Growth"}
            date={
              mostRecentCashIn
                ? formatDate(mostRecentCashIn.txn_week.toString())
                : ""
            }
            value={mostRecentCashIn?.txn_growth_pct}
          />
          <DashboardCard
            title={"Total Daily Data"}
            date={coreSpend?.date ? formatDate(coreSpend.date.toString()) : ""}
            value={`${formatNumber(coreSpend?.total_data_usage)} MB`}
          ></DashboardCard>

          <DashboardCard
            title={"Total Daily SMS"}
            date={coreSpend?.date ? formatDate(coreSpend.date.toString()) : ""}
            value={`${formatNumber(coreSpend?.total_sms_usage)} SMS`}
          ></DashboardCard>

          <DashboardCard
            title={"Total Daily Voice"}
            date={coreSpend?.date ? formatDate(coreSpend.date.toString()) : ""}
            value={`${formatNumber(coreSpend?.total_voice_usage)} Mins`}
          ></DashboardCard>

          <DashboardCard
            title={"Daily Transactions"}
            date={
              mostRecentCashIn
                ? formatDate(mostRecentCashIn.txn_week.toString())
                : ""
            }
            value={`M${formatNumber(mostRecentCashIn?.weekly_value)}`}
          ></DashboardCard>
        </div>
      </div>

      {/* CASH IN SECTION */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-green-600">
            Cash-In Performance
          </h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-green-600/20 to-transparent"></div>
        </div>
        <div className="flex justify-center gap-4">
          <PercentageCard
            title={"Cash-In Value Growth"}
            date={
              mostRecentCashIn
                ? formatDate(mostRecentCashIn.txn_week.toString())
                : ""
            }
            value={mostRecentCashIn?.value_growth_pct}
          />
          <DashboardCard
            title={"Daily Cash-In"}
            date={
              mostRecentCashIn
                ? formatDate(mostRecentCashIn.txn_week.toString())
                : ""
            }
            value={`M${formatNumber(mostRecentCashIn?.weekly_value)} `}
          ></DashboardCard>

          <DashboardCard
            title={"Previous Daily Cash-In"}
            date={
              mostRecentCashIn
                ? formatDate(mostRecentCashIn.txn_week.toString())
                : ""
            }
            value={`M${formatNumber(mostRecentCashIn?.prev_weekly_value)}`}
          ></DashboardCard>
        </div>
      </div>

      {/* CASH OUT SECTION */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-orange-600">
            Cash-Out Performance
          </h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-orange-600/20 to-transparent"></div>
        </div>
        <div className="flex justify-center gap-4">
          <PercentageCard
            title={"Cash-Out Value Growth"}
            date={
              mostRecentCashOut
                ? formatDate(mostRecentCashOut.txn_week.toString())
                : ""
            }
            value={mostRecentCashOut?.value_growth_pct}
          />
          <DashboardCard
            title={"Daily Cash-Out"}
            date={
              mostRecentCashOut
                ? formatDate(mostRecentCashOut.txn_week.toString())
                : ""
            }
            value={`M${formatNumber(mostRecentCashOut?.weekly_value)}`}
          ></DashboardCard>
          <DashboardCard
            title={"Previous Daily Cash-Out"}
            date={
              mostRecentCashOut
                ? formatDate(mostRecentCashOut.txn_week.toString())
                : ""
            }
            value={`M${formatNumber(mostRecentCashOut?.prev_weekly_value)}`}
          ></DashboardCard>
        </div>
      </div>
    </div>
  );
}

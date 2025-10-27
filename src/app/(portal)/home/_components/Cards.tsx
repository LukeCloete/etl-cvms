import DashboardCard from "@/components/DashboardCard";
import PercentageCard from "./PercentageCard";
import { Core_Spend, Msisdns, Performance_Rankings } from "@/lib/definitions";
import { getCoreSpendData } from "@/lib/getCoreSpend";
import { getPerformanceData } from "@/lib/getPerformance";

interface CardsProps {
  activeMsisdn: Msisdns | null;
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

export default async function Cards({ activeMsisdn }: CardsProps) {
  // 1. Extract the MSISDN string for fetching
  const msisdnString = activeMsisdn!.msisdn.toString();

  // 2. Fetch the data inside the component (This is where the suspendable work happens)
  const [coreSpendData, performanceData] = await Promise.all([
    getCoreSpendData(msisdnString),
    getPerformanceData(msisdnString),
  ]);

  const coreSpend: Core_Spend | null =
    (coreSpendData?.coreSpendData as unknown as Core_Spend) || null;
  const performance: Performance_Rankings[] | null =
    (performanceData?.performanceData as unknown as Performance_Rankings[]) ||
    null;

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
          {mostRecentCashIn && (
            <PercentageCard
              title={"Transaction Growth"}
              date={formatDate(mostRecentCashIn.txn_week.toString())}
              value={mostRecentCashIn?.txn_growth_pct}
            />
          )}
          <DashboardCard
            title={"Total Daily Data"}
            date={coreSpend?.date ? formatDate(coreSpend.date.toString()) : ""}
            value={`${coreSpend?.total_data_usage ?? "0"} MB`}
          ></DashboardCard>

          <DashboardCard
            title={"Total Daily SMS"}
            date={coreSpend?.date ? formatDate(coreSpend.date.toString()) : ""}
            value={`${coreSpend?.total_sms_usage ?? "0"} SMS`}
          ></DashboardCard>

          <DashboardCard
            title={"Total Daily Voice"}
            date={coreSpend?.date ? formatDate(coreSpend.date.toString()) : ""}
            value={`${coreSpend?.total_voice_usage ?? "0"} Mins`}
          ></DashboardCard>

          {mostRecentCashIn && (
            <DashboardCard
              title={"Daily Transactions"}
              date={formatDate(mostRecentCashIn.txn_week.toString())}
              value={`M${mostRecentCashIn?.weekly_value ?? "0"}`}
            ></DashboardCard>
          )}
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
          {mostRecentCashIn && (
            <PercentageCard
              title={"Cash-In Value Growth"}
              date={formatDate(mostRecentCashIn.txn_week.toString())}
              value={mostRecentCashIn?.value_growth_pct}
            />
          )}
          {mostRecentCashIn && (
            <DashboardCard
              title={"Daily Cash-In"}
              date={formatDate(mostRecentCashIn.txn_week.toString())}
              value={`M${mostRecentCashIn?.weekly_value ?? "0"} `}
            ></DashboardCard>
          )}

          {mostRecentCashIn && (
            <DashboardCard
              title={"Previous Daily Cash-In"}
              date={formatDate(mostRecentCashIn.txn_week.toString())}
              value={`M${mostRecentCashIn?.prev_weekly_value ?? "0"}`}
            ></DashboardCard>
          )}
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
          {mostRecentCashOut && (
            <PercentageCard
              title={"Cash-Out Value Growth"}
              date={formatDate(mostRecentCashOut.txn_week.toString())}
              value={mostRecentCashOut?.value_growth_pct}
            />
          )}
          {mostRecentCashOut && (
            <DashboardCard
              title={"Daily Cash-Out"}
              date={formatDate(mostRecentCashOut.txn_week.toString())}
              value={`M${mostRecentCashOut?.weekly_value ?? "0"}`}
            ></DashboardCard>
          )}
          {mostRecentCashOut && (
            <DashboardCard
              title={"Previous Daily Cash-Out"}
              date={formatDate(mostRecentCashOut.txn_week.toString())}
              value={`M${mostRecentCashOut?.prev_weekly_value ?? "0"}`}
            ></DashboardCard>
          )}
        </div>
      </div>
    </div>
  );
}

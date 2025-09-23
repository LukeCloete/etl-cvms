import DashboardCard from "@/components/DashboardCard";
import { Core_Spend, Performance_Rankings } from "@/lib/definitions";

interface CardsProps {
  coreSpendData: { coreSpendData: Core_Spend };
  performanceData: { performanceData: Performance_Rankings }[];
}

const formatDate = (dateString: string) => {
  // Ensure the dateString is valid before creating a Date object
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Return an empty string or handle the error gracefully if the date is invalid
    return "";
  }
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export default function Cards({ coreSpendData, performanceData }: any) {
  // console.log("this is inside the Cards --------------------");
  // console.log("Core Spend Data:", coreSpendData);
  // console.log("Performance Data:", performanceData);
  // console.log(performanceData.performanceData.txn_week);
  // console.log(performanceData.performanceData.weekly_value);

  const cashinData = performanceData.performanceData.filter(
    (item: any) => item.txn_type === "CASHIN"
  );

  const sortedPerformanceData: Performance_Rankings[] =
    performanceData.performanceData.sort((a: any, b: any) => {
      return new Date(b.txn_week).getTime() - new Date(a.txn_week).getTime();
    });
  // console.log("Sorted Performance Data:", sortedPerformanceData);

  // Find the most recent CASHIN and CASHOUT objects
  const mostRecentCashIn = sortedPerformanceData.find(
    (item) => item.txn_type === "CASHIN"
  );
  const mostRecentCashOut = sortedPerformanceData.find(
    (item) => item.txn_type === "CASHOUT"
  );

  return (
    <div className="flex justify-center gap-4 mb-8">
      <DashboardCard
        title={"Total Daily Data"}
        date={
          coreSpendData?.coreSpendData?.date
            ? formatDate(coreSpendData.coreSpendData.date.toString())
            : "0"
        }
        value={`${coreSpendData?.coreSpendData?.total_data_usage || "0"} MB`}
      ></DashboardCard>

      <DashboardCard
        title={"Total Daily SMS"}
        date={
          coreSpendData?.coreSpendData?.date
            ? formatDate(coreSpendData.coreSpendData.date.toString())
            : "0"
        }
        value={`${coreSpendData?.coreSpendData?.total_sms_usage || "0"} SMS`}
      ></DashboardCard>

      <DashboardCard
        title={"Total Daily Voice"}
        date={
          coreSpendData?.coreSpendData?.date
            ? formatDate(coreSpendData.coreSpendData.date.toString())
            : "0"
        }
        value={`${coreSpendData?.coreSpendData?.total_voice_usage || "0"} Mins`}
      ></DashboardCard>

      {mostRecentCashIn && (
        <DashboardCard
          title={"Weekly Cash-In"}
          date={formatDate(mostRecentCashIn.txn_week.toString())}
          value={`${mostRecentCashIn?.weekly_value || "0"} LSL`}
        ></DashboardCard>
      )}

      {mostRecentCashOut && (
        <DashboardCard
          title={"Weekly Cash-Out"}
          date={formatDate(mostRecentCashOut.txn_week.toString())}
          value={`${mostRecentCashOut?.weekly_value || "0"} LSL`}
        ></DashboardCard>
      )}
    </div>
  );
}

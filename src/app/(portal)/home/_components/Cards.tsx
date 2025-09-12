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
  const sortedPerformanceData: Performance_Rankings[] =
    performanceData.performanceData.sort((a: any, b: any) => {
      return new Date(b.txn_week).getTime() - new Date(a.txn_week).getTime();
    });

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

        date={formatDate(coreSpendData.coreSpendData.date.toString())}
        value={`${coreSpendData.coreSpendData.total_data_usage || "0"} MB`}

      ></DashboardCard>

      {/* <DashboardCard
        title={"Total Daily SMS"}

        date={formatDate(coreSpendData.coreSpendData.date.toString())}
        value={`${coreSpendData.coreSpendData.total_sms_usage || "0"} SMS`}
      ></DashboardCard>




      {/* <DashboardCard
        title={"Total Daily Voice"}

        date={formatDate(coreSpendData.coreSpendData.date.toString())}
        value={`${coreSpendData.coreSpendData.total_voice_usage || "0"} Mins`}
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

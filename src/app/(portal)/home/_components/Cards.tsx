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

export default function Cards({
  coreSpendData,
  performanceData,
}: {
  coreSpendData: any;
  performanceData: any;
}) {
  // const cashinData = performanceData.performanceData.filter(
  //   (item: any) => item.txn_type === "CASHIN"
  // );

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
    <div className="flex flex-col">
      {/* ROW OF CARDS OF MISC DATA */}
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
          value={`${
            coreSpendData?.coreSpendData?.total_voice_usage || "0"
          } Mins`}
        ></DashboardCard>

        <DashboardCard
          title={"Total Daily Voice"}
          date={
            coreSpendData?.coreSpendData?.date
              ? formatDate(coreSpendData.coreSpendData.date.toString())
              : "0"
          }
          value={`${
            coreSpendData?.coreSpendData?.total_voice_usage || "0"
          } Mins`}
        ></DashboardCard>

        {mostRecentCashIn && (
          <DashboardCard
            title={"Weekly Transactions"}
            date={formatDate(mostRecentCashIn.txn_week.toString())}
            value={`${mostRecentCashIn?.weekly_value || "0"} LSL`}
          ></DashboardCard>
        )}
        {mostRecentCashIn && (
          <DashboardCard
            title={"Transaction Growth pct"}
            date={formatDate(mostRecentCashIn.txn_week.toString())}
            value={`${mostRecentCashIn?.txn_growth_pct || "0"} %`}
          ></DashboardCard>
        )}
      </div>
      {/* ROW OF CARDS FOR CASH IN */}
      <div className="flex justify-center gap-4 mb-8">
        {mostRecentCashIn && (
          <DashboardCard
            title={"Weekly Cash-In"}
            date={formatDate(mostRecentCashIn.txn_week.toString())}
            value={`${mostRecentCashIn?.weekly_value || "0"} LSL`}
          ></DashboardCard>
        )}

        {mostRecentCashIn && (
          <DashboardCard
            title={"Cash-In Value Growth pct"}
            date={formatDate(mostRecentCashIn.txn_week.toString())}
            value={`${mostRecentCashIn?.value_growth_pct || "0"} %`}
          ></DashboardCard>
        )}
        {mostRecentCashIn && (
          <DashboardCard
            title={"Previous Weekly Cash-In"}
            date={formatDate(mostRecentCashIn.txn_week.toString())}
            value={`${mostRecentCashIn?.prev_weekly_value || "0"} LSL`}
          ></DashboardCard>
        )}
      </div>
      {/* CASH OUT CARDS */}
      <div className="flex justify-center gap-4 mb-8">
        {mostRecentCashOut && (
          <DashboardCard
            title={"Weekly Cash-Out"}
            date={formatDate(mostRecentCashOut.txn_week.toString())}
            value={`${mostRecentCashOut?.weekly_value || "0"} LSL`}
          ></DashboardCard>
        )}
        {mostRecentCashOut && (
          <DashboardCard
            title={"Cash-Out Value Growth pct"}
            date={formatDate(mostRecentCashOut.txn_week.toString())}
            value={`${mostRecentCashOut?.value_growth_pct || "0"} %`}
          ></DashboardCard>
        )}
        {mostRecentCashOut && (
          <DashboardCard
            title={"Previous Weekly Cash-Out"}
            date={formatDate(mostRecentCashOut.txn_week.toString())}
            value={`${mostRecentCashOut?.prev_weekly_value || "0"} LSL`}
          ></DashboardCard>
        )}
      </div>
    </div>
  );
}

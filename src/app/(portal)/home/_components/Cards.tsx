import DashboardCard from "@/components/DashboardCard";
import { Core_Spend, Performance_Rankings } from "@/lib/definitions";
interface CardsProps {
  spendData: {
    coreSpend: Core_Spend;
  };
  performanceData: {
    performance: Performance_Rankings;
  };
}

export default function Cards({ spendData, performanceData }: any) {
  console.log("Below is the code in the Cards component----------------");
  console.log("corespend data: ", spendData);
  console.log(".corepsend: ", spendData.coreSpend.spendData.total_data_usage);
  // console.log("performance data: ", performanceData);

  return (
    <div className="flex justify-center gap-4 mb-8">
      <DashboardCard
        title={"Total Daily Data"}
        date={"date"}
        value={`${spendData.coreSpend.spendData.total_data_usage || "0"} MB`}
      ></DashboardCard>

      {/* <DashboardCard
        title={"Total Daily SMS"}
        date={"date"}
        value={`${spendData.coreSpend.total_sms_usage || "0"} SMS`}
      ></DashboardCard> */}

      {/* <DashboardCard
        title={"Total Daily Voice"}
        date={"date"}
        value={`${spendData.coreSpend.total_voice_usage || "0"} Mins`}
      ></DashboardCard> */}

      {/* <DashboardCard
        title={"Weekly Cash-In"}
        date={"date"}
        value={`${spendData.coreSpend.total_voice_usage || "0"} LSL`}
      ></DashboardCard> */}

      {/* <DashboardCard
        title={"Weekly Cash-Out"}
        date={"date"}
        value={`${spendData.coreSpend.total_voice_usage || "0"} LSL`}
      ></DashboardCard> */}
    </div>
  );
}

import DashboardCard from "@/components/DashboardCard";

export default function Cards(data: any) {
  console.log("cardData is:", data);

  return (
    <div className="flex justify-center gap-4 mb-8">
      <DashboardCard
        title={"Total Daily Data"}
        date={"date"}
        value={`${data.data.coreSpend.spendData?.total_data_usage || "0"} MB`}
      ></DashboardCard>

      <DashboardCard
        title={"Total Daily SMS"}
        date={"date"}
        value={`${data.data.coreSpend.spendData.total_sms_usage || "0"} SMS`}
      ></DashboardCard>

      <DashboardCard
        title={"Total Daily Voice"}
        date={"date"}
        value={`${data.data.coreSpend.spendData.total_voice_usage || "0"} Mins`}
      ></DashboardCard>

      <DashboardCard
        title={"Weekly Cash-In"}
        date={"date"}
        value={`${
          data.data.performance.performanceData.weekly_value || "0"
        } LSL`}
      ></DashboardCard>

      <DashboardCard
        title={"Weekly Cash-Out"}
        date={"date"}
        value={`${data?.weeklyCashOut || "0"} LSL`}
      ></DashboardCard>
    </div>
  );
}

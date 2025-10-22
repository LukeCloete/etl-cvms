import { getCurrentAgent } from "@/lib/getAgent";
import { redirect } from "next/navigation";

export default async function Home() {
  const agent = await getCurrentAgent();

  if (!agent) {
    redirect("/log-in");
  } else {
    redirect("/home");
  }

  return null;
}

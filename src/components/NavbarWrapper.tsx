import Navbar from "./Navbar";
import axiosInstance from "@/lib/axiosInstance";
import { Agent } from "@/lib/definitions";

export default async function NavbarWrapper() {
  let agent: Agent | null = null;
  try {
    const response = await axiosInstance({
      url: "http://localhost:3000/api/agent/me",
      method: "get",
    });
    agent = response.data.agent;
  } catch (error) {
    console.error("Failed to fetch agent data:", error);
  }

  return <Navbar initialAgentData={agent} />;
}

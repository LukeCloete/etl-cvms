"use client";

import { useEffect, useState } from "react";
import { Bell, User } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Agents } from "@/lib/definitions";
import { useRouter, useSearchParams } from "next/navigation";

export default function NavbarUserContent() {
  const [agent, setAgent] = useState<Agents | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchAgent(msisdn?: string) {
      setLoading(true);
      try {
        const url = msisdn ? `/api/agents?msisdn=${msisdn}` : "/api/agent/me";
        const response = await fetch(url); // Client-side fetch automatically includes cookies

        if (!response.ok) {
          throw new Error("Failed to fetch agent data.");
        }

        const data = await response.json();
        setAgent(data.agent);
      } catch (error) {
        console.error("Error fetching agent data:", error);
        setAgent(null);
      } finally {
        setLoading(false);
      }
    }
    const msisdn = searchParams.get("msisdn");
    fetchAgent(msisdn || undefined);
  }, [searchParams]);

  const handleMsisdnChange = (newMsisdn: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("msisdn", newMsisdn);
    router.push(`/home?${params.toString()}`);
  };

  if (loading || !agent) {
    return (
      <div className="flex items-center justify-center gap-2">
        {/* Skeleton or Login link based on logic */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <User />
            <p>
              <a href="/log-in" className="text-sm">
                Log In
              </a>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Bell width={18} height={18} />
      <div className="flex items-center justify-center gap-2 rounded-full p-2">
        <Select
          onValueChange={handleMsisdnChange}
          defaultValue={agent.msisdns[0]?.msisdn.toString()}
        >
          <SelectTrigger className="rounded-full">
            <SelectValue placeholder="Select a number" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            <SelectGroup>
              <SelectLabel>Your MSISDN numbers</SelectLabel>
              {agent.msisdns.map((msisdn) => (
                <SelectItem
                  key={msisdn.$id}
                  value={msisdn.msisdn.toString()}
                  className="space-x-2"
                >
                  {msisdn.msisdn}
                  {/* <Badge className="border-2 ml-2 border-yellow-500 hover:bg-yellow-500/20 bg-yellow-500/20 text-yellow-500">
                    Gold
                  </Badge> */}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <User />
    </div>
  );
}

export const LoadingSkeleton = () => (
  <div className="flex items-center justify-center gap-2 animate-pulse">
    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
    <div className="flex items-center justify-center gap-2 rounded-full p-2">
      <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
      <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
    </div>
    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
  </div>
);

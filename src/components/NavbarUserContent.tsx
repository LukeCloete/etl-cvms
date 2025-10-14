"use client";

import { Bell, User } from "lucide-react";
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
import Link from "next/link";
import { setActiveMsisdn } from "@/lib/actions";
import { useTransition } from "react";

export default function NavbarUserContent({ 
  agent,
  activeMsisdn 
}: { 
  agent: Agents | null;
  activeMsisdn: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  const handleMsisdnChange = (newMsisdn: string) => {
    startTransition(async () => {
      await setActiveMsisdn(newMsisdn);
    });
  };

  if (!agent) {
    return (
      <div className="flex items-center justify-center gap-2">
        <>
          <User />
          <p>
            <Link href="/log-in" className="text-sm">
              Log In
            </Link>
          </p>
        </>
      </div>
    );
  }

  // Show loading skeleton while switching MSISDN
  if (isPending) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Bell width={18} height={18} />
      <div className="flex items-center justify-center gap-2 rounded-full p-2">
        <Select
          onValueChange={handleMsisdnChange}
          value={activeMsisdn || agent.msisdns[0]?.msisdn.toString()}
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

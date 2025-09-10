"use client";

import Link from "next/link";
import COMPANY_LOGO from "../public/etl-logo.png";
import Image from "next/image";
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
import { Agent } from "@/lib/definitions";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getUser } from "@/lib/actions";

// Define the links
const Links = [
  { name: "Home", href: "/home" },
  { name: "Rewards", href: "/rewards" },
  { name: "History", href: "/history" },
];

interface NavbarProps {
  initialAgentData: Agent | null;
}

export default function Navbar({ initialAgentData }: NavbarProps) {
  const [agent, setAgent] = useState<Agent | null>(initialAgentData);
  const searchParams = useSearchParams();
  const router = useRouter();

  if (!agent) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const currentMsisdnInUrl = searchParams.get("msisdn");
    const defaultMsisdn = agent.msisdns[0]?.msisdn.toString();

    // Only update the URL if the msisdn parameter is missing and a default exists
    if (!currentMsisdnInUrl && defaultMsisdn) {
      console.log("Setting initial msisdn in URL:", defaultMsisdn);
      const params = new URLSearchParams(searchParams);
      params.set("msisdn", defaultMsisdn);
      // Use router.replace to update the URL without adding a new history entry
      router.replace(`/home?${params.toString()}`);
    }
  }, [agent, router, searchParams]);

  const handleMsisdnChange = (newMsisdn: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("msisdn", newMsisdn);
    router.push(`/home?${params.toString()}`);
  };

  console.log("searchParams are: ", searchParams);

  return (
    <nav className="fixed top-0 px-8 py-2 w-full flex items-center justify-center h-fit">
      <div className="px-2 bg-white flex justify-between rounded-lg border border-blue-800/20 shadow-md shadow-blue-800/20 w-full">
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="w-24 h-auto relative">
            <Image
              src={COMPANY_LOGO}
              width={512}
              height={512}
              alt="EcoNet Logo w-full h-auto"
            />
          </div>
          {agent.name}
          <div className="flex items-center justify-center gap-2 font-semibold text-econetBlue">
            {Links.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 ">
          <Bell width={18} height={18} />
          <div className="flex items-center justify-center gap-2 rounded-full p-2">
            <Select
              onValueChange={handleMsisdnChange}
              defaultValue={agent.msisdns[0].msisdn.toString()}
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
                    >
                      {msisdn.msisdn}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Badge className="border-2 border-yellow-500 hover:bg-yellow-500/20 bg-yellow-500/20 text-yellow-500">
              Gold
            </Badge>
          </div>
          <User />
        </div>
      </div>
    </nav>
  );
}

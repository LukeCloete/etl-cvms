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
import { setActiveMsisdn, signOut } from "@/lib/actions";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function NavbarUserContent({
  agent,
  activeMsisdn,
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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center gap-2 p-2">
            <Bell width={18} height={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-gray-600">
            Notifications
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-gray-400">
            No new notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center rounded-full bg-econetBlue text-econetWhite w-8 h-8">
            <p>{agent.name.split("")[0]}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-gray-600">
            {agent.name.split(" ")[0]}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">View Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              startTransition(async () => {
                await signOut();
              });
            }}
            className="font-bold text-red-500"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const LoadingSkeleton = () => (
  <div className="flex items-center justify-center gap-2 p-2 animate-pulse">
    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>

    <div className="w-24 h-10 bg-gray-200 rounded-full"></div>

    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
  </div>
);

"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Landmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Msisdns, Ebucks_Tiers } from "@/lib/definitions";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

interface RewardProfileCardProps {
  eBucksBalance: string;
  eBucksTiers: Ebucks_Tiers[] | null;
  msisdn: Msisdns | null;
}

export default function RewardProfileCard({
  eBucksBalance,
  eBucksTiers,
  msisdn,
}: RewardProfileCardProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (msisdn && eBucksTiers) {
      const eBucksToNextTier = eBucksTiers.find(
        (tier) => tier.min_balance_req > msisdn.current_ebucks_balance
      );

      const eBucksBalanceInPercentage = eBucksToNextTier
        ? (msisdn.current_ebucks_balance / eBucksToNextTier.min_balance_req) *
          100
        : 100; // max progress

      const timer = setTimeout(
        () => setProgress(eBucksBalanceInPercentage),
        500
      );
      return () => clearTimeout(timer);
    }
  }, [msisdn, eBucksTiers]);

  if (!msisdn || !eBucksTiers) {
    return (
      <Card className="bg-econetBlue text-econetWhite p-2 rounded-lg flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Landmark />
            E-Bucks Balance
          </CardTitle>
          <CardDescription className="text-econetWhite">
            Earn more with every Econet service
          </CardDescription>
        </CardHeader>
        <CardContent className=" flex">
          <div className="text-4xl font-bold">
            <p>No data available</p>
          </div>
        </CardContent>
        <CardContent className="flex w-full">
          <Progress value={0} />
        </CardContent>
      </Card>
    );
  }

  const eBucksToNextTier = eBucksTiers.find(
    (tier) => tier.min_balance_req > msisdn.current_ebucks_balance
  );

  return (
    <Card className="bg-econetBlue text-econetWhite p-2 rounded-lg flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Landmark />
          E-Bucks Balance
        </CardTitle>
        <CardDescription className="text-econetWhite">
          Earn more with every Econet service
        </CardDescription>
      </CardHeader>
      <CardContent className=" flex">
        <div className="text-4xl font-bold">
          <p>{eBucksBalance}</p>
        </div>
      </CardContent>
      <CardContent className="flex w-full items-center justify-center gap-2">
        <Progress value={progress} />
        {eBucksToNextTier && (
          <Badge
            className={clsx("border-2", {
              "border-amber-500 hover:bg-amber-500/20 bg-amber-500/20 text-amber-500":
                eBucksToNextTier.tier_name === "bronze",
              "border-slate-300 hover:bg-slate-300/20 bg-slate-300/20 text-slate-200":
                eBucksToNextTier.tier_name === "silver",
              "border-yellow-500 hover:bg-yellow-500/20 bg-yellow-500/20 text-yellow-500":
                eBucksToNextTier.tier_name === "gold",
              "border-purple-500 hover:bg-purple-500/20 bg-purple-500/20 text-purple-500":
                eBucksToNextTier.tier_name === "platinum",
            })}
          >
            {eBucksToNextTier.tier_name}
          </Badge>
        )}
      </CardContent>
      <CardContent className=" flex space-x-2">
        <CardDescription className="text-econetWhite">
          {eBucksToNextTier ? (
            <p className="font-bold text-white/80 text-sm">
              Earn{" "}
              <span className="text-amber-500">
                {eBucksToNextTier.min_balance_req -
                  msisdn.current_ebucks_balance}{" "}
                E-Bucks
              </span>{" "}
              to reach the {eBucksToNextTier.tier_name} tier
            </p>
          ) : (
            <p className="font-bold text-white/80 text-sm">
              You are at the highest tier!
            </p>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

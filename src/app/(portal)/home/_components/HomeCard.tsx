"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Msisdns, Ebucks_Tiers } from "@/lib/definitions";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface HomeCardProps {
  msisdn: Msisdns | null;
  eBucksTiers: Ebucks_Tiers[] | null;
}

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) {
    return "0";
  }
  return value.toLocaleString("sv-SE");
};

export default function HomeCard({ msisdn, eBucksTiers }: HomeCardProps) {
  const [progress, setProgress] = useState(0);

  if (!msisdn || !eBucksTiers) {
    return (
      <Card className="bg-econetBlue text-econetWhite">
        <CardHeader>
          <div className="flex flex-row justify-between">
            <CardTitle className="tracking-wide">
              Your E-Bucks Balance
            </CardTitle>
          </div>
          <div className="flex flex-row justify-between items-center">
            <CardDescription className="text-white/80 text-sm">
              Earn more with every use of EcoCash services
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="mt-8">
          <div className="flex items-center justify-center">
            <p>No data available</p>
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={0} />
        </CardFooter>
      </Card>
    );
  }

  // Find the next tier based on the eBucksBalance prop
  const eBucksToNextTier = eBucksTiers.find(
    (tier) => tier.min_balance_req > msisdn.current_ebucks_balance
  );

  const highestAchievedTier = [...eBucksTiers]
    .sort((a, b) => b.min_balance_req - a.min_balance_req)
    .find((tier) => msisdn.current_ebucks_balance >= tier.min_balance_req);

  const eBucksBalanceInPercentage = eBucksToNextTier
    ? (msisdn.current_ebucks_balance / eBucksToNextTier.min_balance_req) * 100
    : 100; // max progress

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const timer = setTimeout(() => setProgress(eBucksBalanceInPercentage), 500);
    return () => clearTimeout(timer);
  }, [eBucksBalanceInPercentage]);

  return (
    <Card className=" bg-econetBlue text-econetWhite">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className=" tracking-wide">Your E-Bucks Balance</CardTitle>
        </div>
        <div className="flex flex-row justify-between items-center">
          <CardDescription className="text-white/80 text-sm">
            Earn more with every use of EcoCash services
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-8">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col items-start">
            <p className="text-4xl font-bold mb-2">
              {formatNumber(msisdn.current_ebucks_balance)} E-Bucks
            </p>
            {eBucksToNextTier ? (
              <p className="font-bold text-white/80 text-sm">
                Earn{" "}
                <span className="text-amber-500">
                  {formatNumber(
                    eBucksToNextTier.min_balance_req -
                      msisdn.current_ebucks_balance
                  )}{" "}
                </span>{" "}
                to reach the {eBucksToNextTier.tier_name} tier
              </p>
            ) : (
              <p className="font-bold text-white/80 text-sm">
                You are at the highest tier!
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        {highestAchievedTier && (
          <Badge
            className={clsx("border-2 capitalize", {
              "border-amber-500 hover:bg-amber-500/20 bg-amber-500/20 text-amber-500":
                highestAchievedTier.tier_name === "bronze",
              "border-slate-300 hover:bg-slate-300/20 bg-slate-300/20 text-slate-200":
                highestAchievedTier.tier_name === "silver",
              "border-yellow-500 hover:bg-yellow-500/20 bg-yellow-500/20 text-yellow-500":
                highestAchievedTier.tier_name === "gold",
              "border-purple-500 hover:bg-purple-500/20 bg-purple-500/20 text-purple-500":
                highestAchievedTier.tier_name === "platinum",
            })}
          >
            {highestAchievedTier.tier_name}
          </Badge>
        )}
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
      </CardFooter>
    </Card>
  );
}

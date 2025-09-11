"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, CardSim } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RewardProfileCard from "./_components/RewardProfileCard";
import { Landmark } from "lucide-react";
import { useState } from "react";

export default function page() {
  const ebucksBalance = 5000;
  const [state, setState] = useState(0);

  const buttonColorClasses2000 =
    ebucksBalance < 2000
      ? /* if ebucks less than */
        "bg-red-200/50 "
      : /* if ebucks more than */
        "bg-red-200 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300";
  const buttonColorClasses5000 =
    ebucksBalance < 5000
      ? /* if ebucks less than */
        "bg-red-200/50 "
      : /* if ebucks more than */
        "bg-red-200 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300";
  const buttonColorClasses10000 =
    ebucksBalance < 10000
      ? /* if ebucks less than */
        "bg-red-200/50 "
      : /* if ebucks more than */
        "bg-red-200 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300";
  const buttonColorClasses20000 =
    ebucksBalance < 20000
      ? /* if ebucks less than */
        "bg-red-200/50 "
      : /* if ebucks more than */
        "bg-red-200 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300";

  return (
    <div>
      <div className="flex p-8 ">
        <div className="w-1/5 flex flex-col gap-4">
          <RewardProfileCard eBucksBalance={ebucksBalance.toString()} />
          <Card>
            <CardHeader>
              <CardTitle className="flex space-x-2 text-econetBlue ">
                <div>
                  <History />
                </div>
                <div>Your Recent Activity</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div>
                <p className="font-bold">E-Bucks Earned</p>
                <p>Call made - 12 min</p>
              </div>
              <p className="bg-econetBlue p-2 text-econetWhite ml-auto flex rounded-full justify-center items-center">
                +25 E-Bucks
              </p>
            </CardContent>
            <CardContent className=" flex">
              <div>
                <p className="font-bold">E-Bucks Earned</p>
                <p>Call made - 16 min</p>
              </div>
              <p className="bg-econetBlue p-2 text-econetWhite ml-auto flex rounded-full justify-center items-center">
                +25 E-Bucks
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="w-4/5 ml-8 ">
          <div className="flex flex-col mb-8">
            <div className="text-econetBlue mb-4">
              <p>Home &gt; Rewards </p>
            </div>
            <p className="mb-4 text-econetBlue text-3xl font-bold">
              Available rewards
            </p>
            <div className="flex rounded-full p-2 space-x-4 ">
              <button
                onClick={() => setState(0)}
                className="bg-econetBlue text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                All Rewards
              </button>
              <button
                onClick={() => setState(1)}
                className="text-gray-800 font-medium whitespace-nowrap"
              >
                Data Bundles
              </button>
              <button
                onClick={() => setState(2)}
                className="text-gray-800 font-medium whitespace-nowrap"
              >
                Ts'oara Bohle Hohle Calling
              </button>
            </div>
          </div>

          {/* First div for all the cards */}
          <div className="flex flex-col gap-8 ">
            {/* DIV for first row  */}

            {(state === 0 || state === 1) && (
              <div>
                <p className="text-econetBlue font-bold mb-6">
                  Daily DATA Bundles
                </p>
                <div className="flex space-x-4 ">
                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        20 MB
                      </p>
                      <p className="text-red-500">200 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="text-base bg-red-200 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300">
                            Redeem Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="">
                          <DialogHeader>
                            <DialogTitle className="text-center text-econetBlue">
                              YOU ARE ABOUT TO REDEEM
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col items-center gap-2 ">
                            <div className="mt-4 bg-econetBlue p-2 rounded-xl border border-white/10">
                              <CardSim className="text-white size-8" />
                            </div>
                            <p className="text-econetBlue text-2xl font-bold pt-8">
                              20 MB DAILY BUNDLE
                            </p>
                            <p className="text-red-500 font-bold">
                              200 E-Bucks
                            </p>
                            <p className=" p-2 text-center">
                              Are you sure you want to redeem the 20 MB DAILY
                              BUNDLE for 200 E-Bucks ? <br />
                              The redeemd item will expire at midnight
                            </p>
                            <button className=" w-full bg-econetBlue hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 mt-6">
                              Redeem
                            </button>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Cancel
                              </Button>
                            </DialogClose>
                          </div>
                          <DialogFooter className="sm:justify-start flex items-center"></DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>

                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        200 MB
                      </p>
                      <p className="text-red-500">2 000 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button
                        className={`bg-red-200 w-full hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ${buttonColorClasses2000}`}
                      >
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>

                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        500 MB
                      </p>
                      <p className="text-red-500">5 000 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button
                        className={`bg-red-200 w-full hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ${buttonColorClasses5000}`}
                      >
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>

                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        1 GB
                      </p>
                      <p className="text-red-500">10 000 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button
                        className={`bg-red-200 w-full hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ${buttonColorClasses10000}`}
                      >
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>

                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        20 MB
                      </p>
                      <p className="text-red-500">20 000 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button
                        className={`bg-red-200 w-full hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ${buttonColorClasses20000}`}
                      >
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            {/* DIV for second row  */}
            {(state === 0 || state === 1) && (
              <div>
                <p className="text-econetBlue font-bold mb-6">
                  Weekly DATA Bundles
                </p>
                <div className="flex space-x-4">
                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        250 MB
                      </p>
                      <p className="text-red-500">2 000 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button
                        className={`bg-red-200 w-full hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ${buttonColorClasses2000}`}
                      >
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>
                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        800 MB
                      </p>
                      <p className="text-red-500">5 000 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button
                        className={`bg-red-200 w-full hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ${buttonColorClasses5000}`}
                      >
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>
                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        2 GB
                      </p>
                      <p className="text-red-500">10 000 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button
                        className={`bg-red-200 w-full hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ${buttonColorClasses10000}`}
                      >
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* DIV for third row  */}
            {(state === 0 || state === 2) && (
              <div>
                <p className="text-econetBlue font-bold mb-6">
                  Weekly DATA Bundles
                </p>
                <div className="flex space-x-4">
                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        4 Minutes
                      </p>
                      <p className="text-red-500">200 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button className="bg-red-200 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300">
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>
                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        15 Minutes
                      </p>
                      <p className="text-red-500">2 000 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button
                        className={`bg-red-200 w-full hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ${buttonColorClasses2000}`}
                      >
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>
                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        20 Minutes
                      </p>
                      <p className="text-red-500">5 000 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button
                        className={`bg-red-200 w-full hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ${buttonColorClasses5000}`}
                      >
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>
                  <Card className=" flex flex-col justify-center items-center rounded-xl">
                    <CardHeader>
                      <CardTitle className="">
                        <div className="bg-econetBlue p-2 rounded-xl border border-white/10">
                          <CardSim className="text-white size-8" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center ">
                      <p className="text-econetBlue font-bold pb-4">
                        DAILY BUNDLE
                      </p>
                      <p className="text-econetBlue text-2xl font-bold pb-8">
                        1 Hour
                      </p>
                      <p className="text-red-500">10 000 E-Bucks</p>
                      <p className="text-econetBlue p-2">
                        Bundle expires at midnight
                      </p>
                      <button
                        className={`bg-red-200 w-full hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ${buttonColorClasses10000}`}
                      >
                        Redeem now
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

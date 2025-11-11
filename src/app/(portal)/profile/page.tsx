export const dynamic = "force-dynamic";
import ProfileCard from "@/components/ProfileCard";
import { getAgentWithActiveMsisdn } from "@/lib/getAgent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ManagePersonalInfoForm } from "./_components/ManagePersonalInfoForm";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Shield, Star, User } from "lucide-react";
import { UpdatePasswordForm } from "./_components/UpdatePasswordForm";

export default async function page() {
  const data = await getAgentWithActiveMsisdn();
  const agent = data?.agent;
  // 1. Get the date string, defaulting to an empty string if null/undefined
  const agentCreationDate = agent?.$createdAt || "";

  let memberSince = "N/A"; // Set a safe default value for the UI

  if (agentCreationDate) {
    // 2. Attempt to create the Date object
    const dateObject = new Date(agentCreationDate);

    // 3. **CRITICAL CHECK**: Validate if the Date object is actually a valid time value.
    // If the date string was bad (e.g., ""), dateObject.getTime() returns NaN.
    if (!isNaN(dateObject.getTime())) {
      // 4. Only format the date if it's valid
      memberSince = new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(dateObject);
    }
  }
  return (
    <div>
      <div className="flex p-8 mt-16">
        <div className="w-3/4 mr-12 ml-4">
          <p className="text-econetBlue text-3xl font-bold ">My Profile</p>
          <p className="mt-4 mb-8">Manage your account information</p>

          {/* Personal Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex space-x-2">
                <div>
                  <User />
                </div>
                <div>Personal Information</div>
              </CardTitle>
              <CardDescription className="pl-1 flex justify-between">
                Update your personal details and contact information
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"}>Manage</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Manage Personal Information</DialogTitle>
                      <DialogDescription>
                        <ManagePersonalInfoForm
                          phone={agent?.phone || ""}
                          email={agent?.email || ""}
                          fullName={agent?.name || ""}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex p-2 mb-2 rounded-lg">
                <div className="w-1/2">
                  <p className="font-bold">Full Name</p>
                  <p>{agent?.name || "Agent Name"}</p>
                </div>
              </div>

              <div className="flex p-2 mb-2 rounded-lg">
                <div className="w-1/2">
                  <p className="font-bold">Phone Number</p>
                  <p>{agent?.phone || "Not set"}</p>
                </div>
                <div>
                  <p className="font-bold">Email Address</p>
                  <p>{agent?.email || "Not available"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex space-x-2">
                <div>
                  <Shield />
                </div>
                <div>Account Security</div>
              </CardTitle>
              <CardDescription className="pl-1">
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col p-2 ">
                <div className="flex justify-between items-center">
                  <div className="mb-4">
                    <p className="font-bold">Password</p>
                    <p>Last updated 2 months ago</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"outline"}>Update Password</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Password</DialogTitle>
                        <DialogDescription>
                          <UpdatePasswordForm />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-bold">Two-Factor Authentication</p>
                    <p>Add an extra layet of security</p>
                  </div>
                  <Button disabled variant={"outline"}>
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscriptions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex space-x-2">
                <div>
                  <Star />
                </div>
                <div>Subscriptions</div>
              </CardTitle>
              <CardDescription className="pl-1">
                Manage your subscriptions and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col p-2 ">
                <div className="mb-4">
                  <p className="font-bold">14-Day Trial License</p>
                  <p>Actived until 16 Nov 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex space-x-2">
                <div>
                  <Bell />
                </div>
                <div>Notification Preferences</div>
              </CardTitle>
              <CardDescription className="pl-1">
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 p-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">E-Bucks Earned</p>
                    <p>Get notified when you earn E-Bucks</p>
                  </div>
                  <Switch disabled id="ebucks-earned" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">Reward Redemptions</p>
                    <p>Confirmation of successful redemptions</p>
                  </div>
                  <Switch disabled id="reward-redemptions" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">Promotion Offers</p>
                    <p>Special deals and additional E-Buck opportunities</p>
                  </div>
                  <Switch disabled id="promotion-offers" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile card */}
        <ProfileCard
          name={agent?.name || "Agent Name"}
          tier={"Gold"}
          phoneNumber={agent?.phone || "Not set"}
          memberSinceDate={memberSince}
        ></ProfileCard>
      </div>
    </div>
  );
}

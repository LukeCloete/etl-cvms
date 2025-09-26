import ProfileCard from "@/components/ProfileCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, Shield, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default function page() {
  return (
    <div>
      <div className="flex p-8">
        <div className="w-3/4 mr-12 ml-4">
          <div className="text-econetBlue mb-4">
            <p>Home &gt; Profile</p>
          </div>
          <p className="text-econetBlue text-3xl font-bold">My Profile</p>
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
              <CardDescription className="pl-1">
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* First row: first name and last name */}
              <div className="flex border-2 border-solid p-2 mb-2 rounded-lg">
                <div className="w-1/2">
                  <p className="font-bold">First Name</p>
                  <p>Dennis</p>
                </div>
                <div>
                  <p className="font-bold">Last Name</p>
                  <p>Plaatjies</p>
                </div>
              </div>
              {/* Second row: phone number and email address */}
              <div className="flex border-2 border-solid p-2 mb-2 rounded-lg">
                <div className="w-1/2">
                  <p className="font-bold">Phone Number</p>
                  <p>+266 22 123 4567</p>
                </div>
                <div>
                  <p className="font-bold">Email Address</p>
                  <p>dennisplaatjies@gmail.com</p>
                </div>
              </div>
              {/* Third row: Physical Address */}
              <div className="flex border-2 border-solid p-2 mb-2 rounded-lg">
                <div className="w-1/2">
                  <p className="font-bold">Address</p>
                  <p>Maseru, Lesotho</p>
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
                <div className="mb-4">
                  <p className="font-bold">Password</p>
                  <p>Last updated 2 months ago</p>
                </div>
                <div>
                  <p className="font-bold">Two-Factor Authentication</p>
                  <p>Add an extra layet of security</p>
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
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col p-2 ">
                <div className="mb-4">
                  <p className="font-bold">E-Bucks Earned</p>
                  <p>Get notified when you earn E-Bucks</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Reward Redemptions</p>
                  <p>Confirmation of successful redemptions</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Promotion Offers</p>
                  <p>Special deals and additional E-Buck opportunities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile card */}
        <ProfileCard
          name={"Agent Name"}
          tier={"Gold"}
          phoneNumber={"+266 123 4567"}
          memberSinceDate={"January 2025"}
        ></ProfileCard>
      </div>
    </div>
  );
}

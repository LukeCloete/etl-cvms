import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, Shield, Calendar, Phone, User } from "lucide-react";

export default function page() {
  return (
    <div>
      <div className="flex p-8">
        <div className="w-2/3 mr-12 ml-4">
          <div className="text-econetBlue mb-4">
            <p>Home &gt; Profile</p>
          </div>
          <p className="text-econetBlue text-3xl font-bold">My Profile</p>
          <p className="mt-4 mb-8">Manage your account information</p>

          <Card>
            <CardHeader>
              <CardTitle className="flex">
                <User />
                Personal Information
              </CardTitle>
              <CardDescription className="pl-2">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex">
                <Shield />
                Account Security
              </CardTitle>
              <CardDescription className="pl-2">
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col p-2 ">
                <div>
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
              <CardTitle className="flex">
                <Bell />
                Notification Preferences
              </CardTitle>
              <CardDescription className="pl-2">
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col p-2 ">
                <div>
                  <p className="font-bold">E-Bucks Earned</p>
                  <p>Get notified when you earn E-Bucks</p>
                </div>
                <div>
                  <p className="font-bold">Reward Redemptions</p>
                  <p>Confirmation of successful redemptions</p>
                </div>
                <div>
                  <p className="font-bold">Promotion Offers</p>
                  <p>Special deals and additional E-Buck opportunities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile card */}
        <div className="w-1/3 flex flex-col gap-4 mr-4">
          <Card className="bg-econetBlue text-econetWhite p-4 rounded-lg flex flex-col justify-center items-center">
            <CardHeader>
              <CardTitle className="flex ">
                <User />
                Dennis Plaatjies
              </CardTitle>
            </CardHeader>
            <CardContent className=" flex">
              <div>
                <p>GOLD</p>
              </div>
            </CardContent>
            <CardContent className=" flex">
              <Phone />
              <p>+266 123 4567</p>
            </CardContent>
            <CardContent className=" flex">
              <Calendar />
              <p>Memeber since January 2025</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

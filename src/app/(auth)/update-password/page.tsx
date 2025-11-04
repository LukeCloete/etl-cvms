"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getErrorMessage } from "@/lib/utils";
import COMPANY_LOGO from "../../../public/etl-logo.png";
import { toast } from "sonner";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Account, Client } from "appwrite";

const formSchema = z
  .object({
    currentPassword: z.string().min(1, "Please enter your current password."),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"], // Set error on confirmPassword field
  });

const UpdatePasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isLoading) return;
    setIsLoading(true);
    toast.info("Updating password...");
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT!) // Your Appwrite Endpoint
      .setProject(process.env.APPWRITE_PROJECT_ID!); // Your project ID

    const account = new Account(client);
    try {
      await account.updatePassword(values.newPassword, values.currentPassword);
      toast.success("Password updated successfully!");
      form.reset();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="relative w-full max-w-md items-center justify-center">
        <Link href="/home" className=" text-econetBlue">
          Back to Home
        </Link>
        <Image
          src={COMPANY_LOGO}
          alt="Company Logo"
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="flex h-fit w-full max-w-md flex-col items-center justify-center">
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 ">
          <h2 className="text-center text-3xl font-bold">Work in Progress</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex w-full flex-col gap-8"
            >
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-econetBlue disabled:bg-gray-300"
                disabled={isLoading}
              >
                Update Password
              </Button>
            </form>
          </Form>
          <div className="flex gap-2 text-sm">
            <Link href="/home" className=" text-econetBlue">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;

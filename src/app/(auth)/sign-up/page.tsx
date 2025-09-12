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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { createSession } from "@/lib/actions";

const formSchema = z.object({
  emailAddress: z.string().email({ message: "Email address is not valid." }),
  password: z.string().min(3, "Please enter a password."),
  firstName: z.string().min(1, "Please enter your first name."),
  lastName: z.string().min(1, "Please enter your last name."),
  msisdn: z.string().min(10, "Please enter a valid EcoCash phone number."),
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      firstName: "",
      lastName: "",
      msisdn: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("submitting");
    if (isLoading) return;
    toast.info("Logging in...");

    try {
      const formData = new FormData();
      formData.append("email", values.emailAddress);
      formData.append("password", values.password);
      setIsLoading(true);
      await createSession(formData);

      toast.success("Login successful!");
    } catch (e) {
      toast.error(getErrorMessage(e));
      console.error("error ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 justify-center h-screen w-full">
      <div className="relative items-center justify-center w-full max-w-md">
        <Image
          src={COMPANY_LOGO}
          alt="Company Logo"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-md h-fit">
        <div className="w-full h-full flex flex-col gap-8 items-center justify-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-8 w-full"
            >
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="msisdn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EcoCash Phone Number</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                Sign Up As EcoCash Agent
              </Button>
            </form>
          </Form>
          <div className="flex gap-2 text-sm">
            <p>Already an EcoCash Rewards member?</p>
            <Link href="/log-in" className=" text-econetBlue">
              Sign into your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

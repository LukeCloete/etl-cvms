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
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
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
    <div className="flex flex-col items-center justify-center h-screen w-full">
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
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
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
                      <FormLabel className="font-bold">Password</FormLabel>
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
                Log In As EcoCash Agent
              </Button>
            </form>
          </Form>
          <div className="flex gap-2 text-sm">
            <p>New to EcoCash Agent Rewards?</p>
            <Link href="/sign-up" className=" text-econetBlue">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

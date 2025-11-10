"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updatePassword } from "@/lib/actions";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters." })
      .regex(/[a-zA-Z]/, {
        message: "New password must contain at least one letter.",
      })
      .regex(/[0-9]/, {
        message: "New password must contain at least one number.",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "New password must contain at least one special character.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm new password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Updating..." : "Update Password"}
    </Button>
  );
}

export function UpdatePasswordForm() {
  const [state, formAction] = useFormState(updatePassword, {
    message: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  if (state?.message) {
    if (state.message === "Password updated successfully.") {
      toast.success(state.message);
      form.reset();
      state.message = ""; // Clear the message after displaying
    } else {
      toast.error(state.message);
      state.message = ""; // Clear the message after displaying
    }
  }

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                >
                  {showCurrentPassword ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeClosedIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showCurrentPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
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
              <div className="relative">
                <FormControl>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeClosedIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showNewPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
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
              <div className="relative">
                <FormControl>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeClosedIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}

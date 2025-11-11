"use client";

import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/actions"; // This action might need to be updated or a new one created

const initialState = {
  message: "",
};

export function ManagePersonalInfoForm({
  phone,
  email,
  fullName,
}: {
  phone: string;
  email: string;
  fullName: string;
}) {
  const [state, formAction] = useFormState(updateProfile, initialState); // Assuming updateProfile can handle this for now

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <Input
          name="fullName"
          defaultValue={fullName || ""}
          placeholder="Full Name"
          disabled
        />
        <Input
          name="email"
          defaultValue={email || ""}
          placeholder="Email Address"
          disabled
        />
        <Input
          name="phone"
          defaultValue={phone || ""}
          placeholder="Enter your phone number"
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter your password to confirm"
        />
        <Button type="submit">Save</Button>
      </div>
      <p className="text-sm text-red-500">{state?.message}</p>
    </form>
  );
}

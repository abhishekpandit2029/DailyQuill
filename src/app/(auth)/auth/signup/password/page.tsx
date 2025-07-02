"use client";

import React from "react";
import Image from "next/image";
import signup from "@/stuff/signup.svg";
import SignupPassword from "@/components/Auth/General/Signup/SignupPassword";

export default function SignupPage() {
  return (
    <div className="flex tab:px-8 tab:pb-4 lap:px-16 lap:pb-8 items-center justify-evenly">
      <div className="hidden tab:flex">
        <Image src={signup} className="min-w-full" alt="Logo" />
      </div>
      <SignupPassword />
    </div>
  );
}

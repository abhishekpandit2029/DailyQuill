"use client";

import React from "react";
import Login from "@/components/Auth/General/Login/Login";
import Image from "next/image";
import login from "@/stuff/login.svg";

export default function LoginPage() {
  return (
    <div className="flex tab:px-8 tab:pb-4 lap:px-16 lap:pb-8 items-center justify-evenly">
      <div className="hidden tab:flex">
        <Image src={login} className="min-w-full" alt="Logo" />
      </div>
      <Login />
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import resetpassword from "@/stuff/resetpassword.svg";
import ResetPasswordForm from "@/components/Form/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex tab:px-8 tab:pb-4 lap:px-16 lap:pb-8 items-center justify-evenly">
      <div className="hidden tab:flex">
        <Image src={resetpassword} className="min-w-full" alt="Logo" />
      </div>
      <ResetPasswordForm />
    </div>
  );
}

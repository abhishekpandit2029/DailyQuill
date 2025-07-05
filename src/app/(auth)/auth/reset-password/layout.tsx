import React from "react";
import Image from "next/image";
import resetpassword from "@/stuff/resetpassword.svg";

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex tab:px-8 tab:pb-4 lap:px-16 lap:pb-8 items-center justify-evenly">
      <div className="hidden tab:flex">
        <Image src={resetpassword} className="min-w-full" alt="Logo" />
      </div>
      {children}
    </div>
  );
}

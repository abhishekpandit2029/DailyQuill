"use client";

import React from "react";
import Image from "next/image";
import google from "@/stuff/google.svg";
import facebook from "@/stuff/facebook.svg";
import twitter from "@/stuff/twitter.svg";
import LoginForm from "../../../Form/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col space-y-4 w-screen tab:w-[25rem] px-6 tab:p-0">
      <LoginForm />
      {/* <p className="text-sm">Or you can join with</p>
      <div className="flex space-x-4">
        <Image src={google} className="w-8" alt="google" />
        <Image src={facebook} className="w-8" alt="facebook" />
        <Image src={twitter} className="w-8" alt="twitter" />
      </div> */}
    </div>
  );
}

"use client";

import React from "react";
import LoginForm from "../../../Form/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col space-y-4 w-screen tab:w-[25rem] px-6 tab:p-0">
      <LoginForm />
    </div>
  );
}

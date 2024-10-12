"use client";

import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthProvider";

export default function LoginForm() {
  const auth = useAuth();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  return (
    <div className="flex flex-col space-y-4 w-full tab:w-[25rem]">
      <div>
        <p className="text-[2.5rem]">Welcome</p>
        <p className="text-[2.5rem]">Scribe :)</p>
      </div>
      <div className="flex flex-col space-y-4">
        <div>
          <p className="text-sm">
            To keep connected with us please login with your personal
            information by email address and password.
          </p>
        </div>
        <div className="flex items-center space-x-6 bg-gray-100 py-3 px-6 rounded-md">
          <div>
            <MailOutlineRoundedIcon />
          </div>
          <div className="flex flex-col w-full">
            <input
              placeholder="example@gmail.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="text"
              className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6 bg-gray-100 py-3 px-6 rounded-md">
          <div>
            <LockOutlinedIcon />
          </div>
          <div className="flex flex-col w-full">
            <input
              placeholder="••••••"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none tracking-widest"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-sm">Remember Me</p>
        </div>
        <div>
          <Link href="forgot-password">
            <p className="hover:underline text-sm cursor-pointer">
              Forgot Password?
            </p>
          </Link>
        </div>
      </div>
      <div className="flex space-x-4">
        <div>
          <button
            onClick={() => auth?.logIn(user)}
            className="rounded-lg border-2 py-2 px-3 text-sm"
          >
            Login Now
          </button>
        </div>
        <div>
          <Link href="signup">
            <button className="rounded-lg border-2 py-2 px-3 text-sm">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { BiShowAlt } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";
import { buttonClassName } from "@/constants/strings";

export default function LoginForm() {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
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
        <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
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
        <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
          <div>
            <LockOutlinedIcon />
          </div>
          <div className="flex flex-col w-full relative">
            <input
              placeholder="••••••••••••"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type={showPassword ? 'text' : 'password'}
              className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none tracking-widest"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2"
            >
              {showPassword ? (
                <BiShowAlt
                  className="text-gray-500 text-xl" />
              ) : (
                <GrFormViewHide className="text-gray-500 text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <Link href="/auth/forgot-password">
            <p className="hover:underline text-sm cursor-pointer">
              Forgot Password?
            </p>
          </Link>
        </div>
        <div>
          <Link href="/auth/reset-password">
            <p className="hover:underline text-sm cursor-pointer">
              Reset Password?
            </p>
          </Link>
        </div>
      </div>
      <div className="flex space-x-4">
        <div>
          <button
            onClick={() => auth?.logIn(user)}
            className={buttonClassName}
          >
            Login Now
          </button>
        </div>
        <div>
          <Link href="signup">
            <button className={buttonClassName}>
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { message } from "antd";
import { BiShowAlt } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";
import { buttonClassName } from "@/constants/strings";

interface ISignupResponse {
  message: string
  error?: string
}

export default function RegisterForm() {
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    try {
      const response = await axios.post<ISignupResponse>("/api/users/signup", user);
      message.success(response.data.message);
      push("/auth/login");
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full tab:w-[25rem]">
      <div className="flex items-center space-x-6 bg-gray-100 py-3 px-6 rounded-md">
        <div>
          <PersonIcon />
        </div>
        <div className="flex flex-col w-full">
          <input
            placeholder="John Doe"
            type="text"
            className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
      </div>
      <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
        <div>
          <MailOutlineRoundedIcon />
        </div>
        <div className="flex flex-col w-full">
          <input
            placeholder="example@gmail.com"
            type="text"
            className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
      <div className="flex space-x-4">
        <div>
          <button
            onClick={onSignup}
            className={buttonClassName}
          >
            Signup
          </button>
        </div>
        <div>
          <Link href="/auth/login">
            <button className={buttonClassName}>
              Login{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

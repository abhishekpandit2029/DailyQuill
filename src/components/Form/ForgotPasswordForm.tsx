"use client";

import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import React, { useState } from "react";
import { usePostMutation } from "@/lib/fetcher";
import { message } from "antd";
import { buttonClassName } from "@/constants/strings";
import { useCookies } from "react-cookie";
import { cookieOptions, getExpiryFromToken } from "@/lib/jwt";

interface IRequest {
  email?: string,
}

interface IResponse {
  exists: boolean
  error: string
  token: string
}

export default function ForgotPasswordForm() {
  const [{ rpfp_token }, setCookie] = useCookies(["rpfp_token"]);
  const [user, setUser] = useState({
    email: "",
    type: "forgot"
  });

  const { trigger, isMutating } = usePostMutation<IRequest, IResponse>("/users/existance", {
    onSuccess(data) {
      const accessToken = data?.token;
      if (accessToken) {
        setCookie("rpfp_token", accessToken, {
          ...cookieOptions,
          expires: getExpiryFromToken(accessToken),
        });
        message.success("Success! An email with the next steps has been sent to your registered email address. The link is valid for 15 minutes, so be sure to use it before it expires.", 5)
      } else message.error(data?.error)
    },
  });

  return (
    <div className="flex flex-col space-y-4 w-full tab:w-[25rem]">
      <div>
        <p className="text-[2.5rem]">Forgot</p>
        <p className="text-[2.5rem]">Password :)</p>
      </div>
      <div className="flex flex-col space-y-4">
        <div>
          <p className="text-sm">
            To change your password, please enter the email address you used for login.
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
      </div>
      <div className="flex space-x-4">
        <button onClick={() => trigger(user)} className={buttonClassName}>
          Submit
        </button>
      </div>
    </div>
  );
}

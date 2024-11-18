"use client";

import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import React, { useState } from "react";
import { usePostMutation } from "@/lib/fetcher";
import { useRouter } from "next/navigation";

interface IRequest {
  email?: string,
}

interface IResponse {
  exists: boolean
}

export default function ResetPasswordForm() {
  const { push } = useRouter();
  const [user, setUser] = useState({
    email: "",
  });

  const { trigger } = usePostMutation<IRequest, IResponse>("/users/existance", {
    onSuccess(data) {
      if (data.exists) push("/login")
    }
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
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => trigger(user)}
          className="rounded-lg border-2 py-2 px-3 text-sm"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

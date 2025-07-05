"use client";

import React, { useState } from "react";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { buttonClassName } from "@/constants/strings";
import { useRouter } from "next/navigation";
import { usePostMutation } from "@/lib/fetcher";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/stores/signupStore";
import { GrFormViewHide } from "react-icons/gr";
import { BiShowAlt } from "react-icons/bi";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface IOTPReq {
    email: string
    hasUser: boolean
    isResetPassword: boolean
    currentPassword: string
}

interface IOTPRes {
    message: string
    name: string
    email: string
}

export default function ResetPasswordEmail() {
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { push } = useRouter();
    const {
        setName,
        email,
        setEmail,
    } = useAuthStore();

    const { trigger, isMutating } = usePostMutation<IOTPReq, IOTPRes>(
        "/users/send-otp",
        {
            onSuccess(data) {
                message.success(data?.message);
                setName(data?.name)
                push(`/auth/reset-password/otp`);
            },
            onError(data) {
                message.error(data?.message);
            },
        }
    );

    return (
        <div className="flex flex-col space-y-5 w-screen tab:w-[25rem] px-6 tab:p-0">
            <div>
                <p className="text-[2.5rem]">New Start,</p>
                <p className="text-[2.5rem]">New Password :)</p>
            </div>
            <p className="text-sm">
                We’ll email you a secure code to verify your identity and help you reset your password in minutes.
            </p>
            <div className="flex flex-col space-y-4 w-full tab:w-[25rem]">
                <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
                    <div>
                        <MailOutlineRoundedIcon />
                    </div>
                    <div className="flex flex-col w-full">
                        <input
                            placeholder="johndoe@dailyquill.com"
                            type="email"
                            className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
                    <LockOutlinedIcon />
                    <div className="flex flex-col w-full relative">
                        <input
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none tracking-widest"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-2"
                        >
                            {showPassword ? (
                                <BiShowAlt className="text-gray-500 text-xl" />
                            ) : (
                                <GrFormViewHide className="text-gray-500 text-xl" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div>
                        <button
                            onClick={() => trigger({ email, hasUser: true, isResetPassword: true, currentPassword: password })}
                            className={`${buttonClassName} ${(!email || !password) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!email || !password}
                        >
                            <div className="flex space-x-2 items-center justify-center">
                                {isMutating ? <><span><LoadingOutlined /></span> <span>Get OTP</span></> : <span>Get OTP</span>}
                            </div>
                        </button>
                    </div>
                </div>
            </div >
        </div >
    );
}

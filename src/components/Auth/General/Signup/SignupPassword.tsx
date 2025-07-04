"use client";

import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AiOutlineRollback } from "react-icons/ai";
import { buttonClassName } from "@/constants/strings";
import Link from "next/link";
import { BiShowAlt } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from '@ant-design/icons';
import { usePostMutation } from "@/lib/fetcher";
import { useAuthStore } from "@/stores/signupStore";

interface ISignupRequest {
    email: string;
    password: string;
    username: string;
}

interface ISignupResponse {
    message: string;
}

export default function SignupPassword() {
    const { push, back } = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const {
        name,
        email,
        reset
    } = useAuthStore();

    const isPasswordMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

    const { trigger, isMutating } = usePostMutation<ISignupRequest, ISignupResponse>("/users/signup", {
        onSuccess(data) {
            message.success(data?.message)
            push("/auth/login/email");
            reset()
        },
        onError(data) {
            message.error(data?.message)
        }
    });


    return (
        <div className="flex flex-col space-y-5 w-screen tab:w-[25rem] px-6 tab:p-0">
            <p className="text-[2.5rem] flex space-x-2 items-center"><span className="cursor-pointer" onClick={() => back()}><AiOutlineRollback /></span>  <span>Hi {name} :)</span> </p>
            <p className="text-sm">
                Create a strong password to secure your DailyQuill account and start writing, sharing, and expressing your thoughts freely.
            </p>

            <div className="flex flex-col space-y-4 w-full tab:w-[25rem]">
                {/* Password Field */}
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

                {/* Confirm Password Field */}
                <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
                    <LockOutlinedIcon />
                    <div className="flex flex-col w-full relative">
                        <input
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

                {/* Optional Error Message */}
                {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-red-500 text-sm">Passwords do not match</p>
                )}

                <div className="flex space-x-4">
                    <button
                        onClick={() => trigger({
                            email: email ?? "",
                            password: password,
                            username: name ?? "",
                        })}
                        disabled={!isPasswordMatch}
                        className={`${buttonClassName} ${!isPasswordMatch ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <div className="flex space-x-2 items-center justify-center">
                            {isMutating ? <><span><LoadingOutlined /></span> <span>Signup</span></> : <span>Signup</span>}
                        </div>
                    </button>

                    <Link href="/auth/login/email">
                        <button className={buttonClassName}>
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AiOutlineRollback } from "react-icons/ai";
import { buttonClassName } from "@/constants/strings";
import Link from "next/link";
import { BiShowAlt } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from '@ant-design/icons';
import { useAuthStore } from "@/stores/signupStore";
import { useAuth } from "@/context/AuthProvider";

export default function LoginPassword() {
    const { back } = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const { name, email } = useAuthStore();
    const auth = useAuth();

    return (
        <div className="flex flex-col space-y-5 w-screen tab:w-[25rem] px-6 tab:p-0">
            <p className="text-[2.5rem] flex space-x-2 items-center"><span className="cursor-pointer" onClick={() => back()}><AiOutlineRollback /></span>  <span>Hi {name} :)</span> </p>
            <p className="text-sm">
                Now enter your password to complete the login process and securely access your account and personal information.
            </p>

            <div className="flex flex-col space-y-4 w-full tab:w-[25rem]">
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
                    <button
                        onClick={() => auth?.logIn({
                            email,
                            password,
                        })}
                        disabled={!password}
                        className={`${buttonClassName} ${!password ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <div className="flex space-x-2 items-center justify-center">
                            {auth?.authIsMutating ? <><span><LoadingOutlined /></span> <span>Login</span></> : <span>Login</span>}
                        </div>
                    </button>

                    <div>
                        <Link href="/auth/signup/email">
                            <button type="button" className={buttonClassName}>
                                Create Account
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}

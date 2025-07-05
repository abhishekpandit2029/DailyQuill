"use client";

import React, { useState } from "react";
import { usePostMutation } from "@/lib/fetcher";
import { BiShowAlt } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { message } from "antd";
import { buttonClassName } from "@/constants/strings";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/stores/signupStore";

interface IRequest {
    email?: string,
}

interface IResponse {
    exists: boolean
}

export default function ForgotPassword() {
    const { push } = useRouter()

    const { email } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);
    const [showReenterPassword, setShowReenterPassword] = useState(false);
    const [passwordFPRP, setPasswordFPRP] = useState({
        new_password: "",
        reenter_new_password: "",
    });
    const payload = {
        email,
        new_password: passwordFPRP?.reenter_new_password,
    }

    const { trigger, isMutating } = usePostMutation<IRequest, IResponse>("/users/update-password", {
        onSuccess() {
            message.success("Passwords update successfully")
            push("/auth/login/email")
        }
    });

    function handleTrigger() {
        if (passwordFPRP?.new_password === passwordFPRP?.reenter_new_password) {
            trigger(payload)
        } else {
            message.info("Passwords not matching, please re-enter and proceed")
        }
    }

    return (
        <div className="flex flex-col space-y-4 w-full tab:w-[25rem]">
            <div>
                <p className="text-[2.5rem]">Hang Tight — </p>
                <p className="text-[2.5rem]">We’re On It :)</p>
            </div>
            <div className="flex flex-col space-y-4">
                <p className="text-sm">
                    Almost there! Create a strong new password to secure your account and get back in.
                </p>
                <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
                    <div>
                        <LockOutlinedIcon />
                    </div>
                    <div className="flex flex-col w-full relative">
                        <input
                            placeholder="••••••••••••"
                            value={passwordFPRP.new_password}
                            onChange={(e) => setPasswordFPRP({ ...passwordFPRP, new_password: e.target.value })}
                            type={showPassword ? 'text' : 'password'}
                            className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none"
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

                <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
                    <div>
                        <LockOutlinedIcon />
                    </div>
                    <div className="flex flex-col w-full relative">
                        <input
                            placeholder="••••••••••••"
                            value={passwordFPRP.reenter_new_password}
                            onChange={(e) => setPasswordFPRP({ ...passwordFPRP, reenter_new_password: e.target.value })}
                            type={showReenterPassword ? 'text' : 'password'}
                            className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none tracking-widest"
                        />
                        <button
                            type="button"
                            onClick={() => setShowReenterPassword((prev) => !prev)}
                            className="absolute right-2 top-2"
                        >
                            {showReenterPassword ? (
                                <BiShowAlt
                                    className="text-gray-500 text-xl" />
                            ) : (
                                <GrFormViewHide className="text-gray-500 text-xl" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex space-x-4">
                <button onClick={handleTrigger} className={buttonClassName}>
                    <div className="flex space-x-2 items-center justify-center">
                        {isMutating ? <><span><LoadingOutlined /></span> <span>Let’s Go</span></> : <span>Let’s Go</span>}
                    </div>
                </button>
            </div>
        </div>
    );
}

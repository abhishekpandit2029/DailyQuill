"use client";

import React from "react";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { buttonClassName } from "@/constants/strings";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePostMutation } from "@/lib/fetcher";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/stores/signupStore";

interface IOTPReq {
    email: string
}

interface IOTPRes {
    message: string
}

export default function SignupEmail() {
    const { push } = useRouter();
    const {
        name,
        email,
        setName,
        setEmail,
    } = useAuthStore();

    const { trigger, isMutating } = usePostMutation<IOTPReq, IOTPRes>(
        "/users/send-otp",
        {
            onSuccess(data) {
                message.success(data?.message);
                push(`/auth/signup/otp`);
            },
            onError(data) {
                message.error(data?.message);
            },
        }
    );

    return (
        <div className="flex flex-col space-y-5 w-screen tab:w-[25rem] px-6 tab:p-0">
            <div>
                <p className="text-[2.5rem]">Register newbie :)</p>
            </div>
            <div>
                <p className="text-sm">
                    Enter your email address to begin your DailyQuill journey. We’ll send a one-time password (OTP) for verification.
                </p>
            </div>


            <div className="flex flex-col space-y-4 w-full tab:w-[25rem]">
                <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
                    <div>
                        <PersonIcon />
                    </div>
                    <div className="flex flex-col w-full">
                        <input
                            placeholder="John Doe"
                            type="text"
                            className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
                    <div>
                        <MailOutlineRoundedIcon />
                    </div>
                    <div className="flex flex-col w-full">
                        <input
                            placeholder="johndoe@gmail.com"
                            type="email"
                            className="border-2 h-8 w-full text-sm bg-gray-100 outline-none border-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div>
                        <button
                            onClick={() => trigger({ email })}
                            className={`${buttonClassName} ${(!name || !email) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!name || !email}
                        >
                            <div className="flex space-x-2 items-center justify-center">
                                {isMutating ? <><span><LoadingOutlined /></span> <span>Verify Email</span></> : <span>Verify Email</span>}
                            </div>
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
            </div >
        </div >
    );
}

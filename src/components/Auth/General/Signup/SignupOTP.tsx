"use client";

import React, { useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { buttonClassName } from "@/constants/strings";
import Link from "next/link";
import { Input, message } from "antd";
import useParams from "@/hooks/useParams";
import { useRouter } from "next/navigation";
import type { GetProps } from 'antd';
import { usePostMutation } from "@/lib/fetcher";
import { LoadingOutlined } from '@ant-design/icons';

type OTPProps = GetProps<typeof Input.OTP>;

interface IOTPReq {
    email: string
    otp: string
}

interface IOTPRes {
    message: string
}

export default function SignupOTP() {
    const [otp, setOTP] = useState<string>()
    const { get } = useParams()
    const { push, back } = useRouter()

    const isValidOtp = /^\d{6}$/.test(otp as string);

    const onChange: OTPProps['onChange'] = (text) => {
        setOTP(text);
    };

    const sharedProps: OTPProps = {
        onChange
    };

    const { trigger, isMutating } = usePostMutation<IOTPReq, IOTPRes>("/users/verify-otp", {
        onSuccess(data) {
            message.success(data?.message)
            push(`/auth/signup/password?name=${get("name")}&email=${get("email")}`)
        },
        onError(data) {
            message.error(data?.message)
        }
    });

    return (
        <div className="flex flex-col space-y-5 w-screen tab:w-[25rem] px-6 tab:p-0">
            <p className="text-[2.5rem] flex space-x-2 items-center"><span className="cursor-pointer" onClick={() => back()}><AiOutlineRollback /></span>  <span>Hi {get("name")} :)</span> </p>
            <p className="text-sm">
                We’ve sent an OTP to {get("email")}. Please enter it below to verify your email address.
            </p>

            <div className="flex flex-col space-y-4 w-full tab:w-[25rem]">
                <div className="flex items-center space-x-6 bg-gray-100 py-3 px-4 rounded-md">
                    <div className="flex flex-col w-full">
                        <Input.OTP size="large" formatter={(str) => str.toUpperCase()} {...sharedProps} />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div>
                        <button
                            onClick={() => {
                                const email = get("email") ?? "";
                                const otpValue = otp ?? "";
                                trigger({
                                    email,
                                    otp: otpValue
                                });
                            }}
                            className={`${buttonClassName} ${!isValidOtp ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={!isValidOtp}
                        >
                            <div className="flex space-x-2 items-center justify-center">
                                {isMutating ? <><span><LoadingOutlined /></span> <span> Verify OTP</span></> : <span> Verify OTP</span>}
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
            </div>
        </div>
    );
}

"use client"

import Image from "next/image";
import forgotpassword from "@/stuff/forgotpassword.svg";
import RedirectFPRPForm from "@/components/Form/RedirectFPRPForm";
import linkexpire from "@/stuff/linkexpire.svg";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";
import useParams from "@/hooks/useParams";
import checkTimeRemaining from "@/helpers/checkTimeRemaining";
import { Suspense } from "react";
import { Skeleton } from "antd";

interface IDecodeToken {
    cat: string | JwtPayload | null;
    db_password: string
    email: string
}

function ExpiredToken() {
    return (
        <div className="flex flex-col space-y-4 mt-4 items-center justify-center">
            <p>Your session has expired. Please verify your credentials on DailyQuill and start a new session.</p>
            <Image src={linkexpire} alt="Logo" />
        </div>
    )
}

export default function RedirectRPFPPage() {
    const { get } = useParams();
    const [isTimeValid, setIsTimeValid] = useState<boolean>(true);
    const token = get("token");
    const decoded: IDecodeToken = jwt.decode(token || "") as IDecodeToken;

    useEffect(() => {
        const isValid = checkTimeRemaining(Number(decoded?.cat));
        setIsTimeValid(isValid);

        if (token !== undefined) {
            const intervalSet = setInterval(() => {
                const isValid = checkTimeRemaining(Number(decoded?.cat));
                setIsTimeValid(isValid);
            }, 15000);
            return () => clearInterval(intervalSet);
        }
    }, [token, decoded?.cat, isTimeValid]);

    return (
        <Suspense fallback={<Skeleton />}>
            {isTimeValid ? (
                <div className="flex tab:px-8 tab:pb-4 lap:px-16 lap:pb-8 items-center justify-evenly">
                    <div className="hidden tab:flex">
                        <Image src={forgotpassword} className="min-w-full" alt="Forgot Password Illustration" />
                    </div>
                    <div className="flex flex-col space-y-4 w-screen tab:w-[25rem] px-6 tab:p-0">
                        <RedirectFPRPForm dbemail={decoded?.email} />
                    </div>
                </div>
            ) : (
                <ExpiredToken />
            )}
        </Suspense>
    );
}

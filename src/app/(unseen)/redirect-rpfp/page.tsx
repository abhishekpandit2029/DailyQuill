"use client"

import Image from "next/image";
import forgotpassword from "@/stuff/forgotpassword.svg";
import RedirectFPRPForm from "@/components/Form/RedirectFPRPForm";
import linkexpire from "@/stuff/linkexpire.svg";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useCookies } from "react-cookie";

interface IDecodeToken {
    cat: string | JwtPayload | null;
    db_password: string
    email: string
    type: string
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
    const [{ rpfp_token }] = useCookies(["rpfp_token"]);
    const isRPFPValid = Boolean(rpfp_token);
    const decoded: IDecodeToken = jwt.decode(rpfp_token) as IDecodeToken;

    return (
        <>
            {isRPFPValid ? (
                <div className="flex tab:px-8 tab:pb-4 lap:px-16 lap:pb-8 items-center justify-evenly">
                    <div className="hidden tab:flex">
                        <Image src={forgotpassword} className="min-w-full" alt="Forgot Password Illustration" />
                    </div>
                    <div className="flex flex-col space-y-4 w-screen tab:w-[25rem] px-6 tab:p-0">
                        <RedirectFPRPForm dbemail={decoded?.email} formtype={decoded?.type} />
                    </div>
                </div>
            ) : (
                <ExpiredToken />
            )}
        </>
    );
}

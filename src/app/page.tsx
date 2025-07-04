"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useAuth } from "@/context/AuthProvider";

export default function IndexPage() {
    const { isLoggedIn } = useAuth();
    const { replace } = useRouter();
    useLayoutEffect(() => {
        if (isLoggedIn) {
            replace("/auth/login/email");
        }
    }, [replace, isLoggedIn]);
    return null;
}
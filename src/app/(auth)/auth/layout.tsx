"use client";

import "@/app/globals.css";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import { getSocket } from "@/lib/socket";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const socket = useRef(getSocket());
    const currentSocket = socket.current
    const [{ userId }] = useCookies(["userId"]);

    useEffect(() => {
        currentSocket?.emit("userOnline", {
            userId: userId,
            isOnline: pathname
        });

        return () => {
            currentSocket.off("userOnline");
        };
    }, [pathname, userId, currentSocket]);

    return (
        <div>
            {children}
        </div>
    );
}

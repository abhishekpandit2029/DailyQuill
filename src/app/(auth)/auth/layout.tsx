"use client";

import "@/app/globals.css";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const socket = useRef<ReturnType<typeof io> | null>(null);
    const [{ userId }] = useCookies(["userId"]);

    useEffect(() => {
        socket.current = io(process.env.NEXT_PUBLIC_DAILYQUILL_SERVER!);;

        if (pathname?.includes("dashboard")) {
            socket.current?.emit("userOnline", {
                userId: userId,
                isOnline: pathname
            });
        } else {
            socket.current?.emit("userOnline", {
                userId: userId,
                isOnline: pathname
            });
        }

        return () => {
            if (socket.current) {
                socket?.current.disconnect();
            }
        };
    }, [userId, pathname]);

    return (
        <div>
            {children}
        </div>
    );
}

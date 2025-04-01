"use client";

import "@/app/globals.css";
import { Poppins } from "next/font/google";
import Link from "next/link";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import AddToDairyModel from "@/components/Modals/AddToDairyModel";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { LuSettings } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/context/AuthProvider";
import { TbMessageChatbot } from "react-icons/tb";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
});

// export const metadata: Metadata = {
//   title: "DailyQuill",
//   description: "Home page of DailyQuill",
// };

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
    const pathname = usePathname();
    const auth = useAuth();

    return (
        <section>
            {isAddNewModalOpen && (
                <AddToDairyModel
                    handleCancel={() => {
                        setIsAddNewModalOpen(false);
                    }}
                    isModalOpen={isAddNewModalOpen}
                    onSave={() => {
                        setIsAddNewModalOpen(false);
                    }}
                    onCancel={() => {
                        setIsAddNewModalOpen(false);
                    }}
                />
            )}

            <div className="rounded-3xl ring-1 ring-gray-200 lg:flex p-3 tab:p-4 mx-3 tab:mx-4 min-h-screen">
                <div className="flex flex-col space-y-4">
                    <div className="rounded-2xl ring-1 ring-gray-200 lg:flex p-3 min-w-[12rem]">
                        <div className="w-full flex flex-row space-x-4">
                            <p className="font-semibold text-[1.5rem]">Core Space</p>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-gray-50 ring-1 ring-inset ring-gray-900/5 min-w-[10rem] h-full">
                        <div className="w-full flex-col space-y-5 p-4 hidden lap:flex">
                            <Link href="/dashboard/profile" passHref prefetch>
                                <p className={clsx("whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2", pathname === '/dashboard/profile' ? 'text-indigo-500' : 'text-gray-900')}>
                                    <span className="text-lg"><Person4OutlinedIcon /> </span>
                                    <span>Persona</span>
                                </p>
                            </Link>
                            <Link href="/dashboard/feed" passHref prefetch>
                                <p className={clsx("whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2", pathname === '/dashboard/feed' ? 'text-indigo-500' : 'text-gray-900')}>
                                    <span className="text-lg"><DynamicFeedIcon /> </span>
                                    <span>Moments</span>
                                </p>
                            </Link>
                            <Link href="/dashboard/inbox" passHref prefetch>
                                <p className={clsx("whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2", pathname === '/dashboard/inbox' ? 'text-indigo-500' : 'text-gray-900')}>
                                    <span><TbMessageChatbot className="text-xl" /> </span>
                                    <span>Inbox</span>
                                </p>
                            </Link>
                            <Link href="/dashboard/bin" passHref prefetch>
                                <p className={clsx("whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2", pathname === '/dashboard/bin' ? 'text-indigo-500' : 'text-gray-900')}>
                                    <span className="text-lg"><DeleteOutlineIcon /> </span>
                                    <span>Recycle</span>
                                </p>
                            </Link>
                            <Link href="/settings/account" passHref prefetch>
                                <p className={clsx("whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2", pathname === '/settings/account' ? 'text-indigo-500' : 'text-gray-900')}>
                                    <span className="text-lg"><LuSettings /> </span>
                                    <span>Adjustments</span>
                                </p>
                            </Link>
                            <p onClick={auth?.logOut} className="whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2">
                                <span className="text-lg"><TbLogout2 /> </span>
                                <span>Adios!</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    {children}
                </div>
            </div>
        </section>
    );
}

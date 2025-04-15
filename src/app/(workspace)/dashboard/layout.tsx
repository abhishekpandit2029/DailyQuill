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
import { Image } from "antd";
import { defaultProfileImage } from "@/constants/strings";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
    const pathname = usePathname();
    const auth = useAuth();

    return (
        <section className="p-4 rounded-xl ring-1 ring-gray-200 max-h-fit mx-4 mt-4">
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

            <div className="flex h-full">
                <div className="flex flex-col space-y-4">
                    <div className="rounded-xl ring-1 ring-gray-200 lg:flex h-fit p-3 m-[0.1rem]">
                        <div className="flex items-center">
                            <a href="/" className="flex items-center space-x-1">
                                <Image className="max-w-[80px] h-auto" src={defaultProfileImage} alt="logo" preview={false} />
                                <span className="self-centr text-[1.5rem] font-semibold whitespace-nowrap">
                                    DailyQuill
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 ring-1 ring-inset ring-gray-900/5 min-w-[10rem] h-full">
                        <div className="w-full flex-col space-y-5 p-4 flex">
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
                            <Link href="/dashboard/settings" passHref prefetch>
                                <p className={clsx("whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2", pathname === '/dashboard/settings' ? 'text-indigo-500' : 'text-gray-900')}>
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

"use client";

import "@/app/globals.css";
import { Poppins } from "next/font/google";
import Link from "next/link";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import AddToDairyModel from "@/components/Modals/AddToDairyModel";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import { usePathname } from "next/navigation";
import clsx from "clsx";

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
                            <p className="font-semibold text-2xl">My Space</p>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-gray-50 ring-1 ring-inset ring-gray-900/5 min-w-[10rem] h-full">
                        <div className="w-full flex-col space-y-5 p-4 hidden lap:flex">
                            <Link href="/dashboard/profile" passHref prefetch>
                                <p className={clsx("whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2", pathname === '/dashboard/profile' ? 'text-indigo-500' : 'text-gray-900')}>
                                    <span><Person4OutlinedIcon /> </span>
                                    <span>Profile</span>
                                </p>
                            </Link>
                            <Link href="/dashboard/feed" passHref prefetch>
                                <p className={clsx("whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2", pathname === '/dashboard/feed' ? 'text-indigo-500' : 'text-gray-900')}>
                                    <span><DynamicFeedIcon /> </span>
                                    <span>Feed</span>
                                </p>
                            </Link>
                            {/* <Link href="/dashboard/inbox" passHref prefetch>
                                <p className={clsx("whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2", pathname === '/dashboard/inbox' ? 'text-indigo-500' : 'text-gray-900')}>
                                    <span><MailOutlinedIcon /> </span>
                                    <span>Inbox</span>
                                </p>
                            </Link> */}
                            <Link href="/dashboard/bin" passHref prefetch>
                                <p className={clsx("whitespace-nowrap text-base font-semibold leading-6 cursor-pointer flex items-center space-x-2", pathname === '/dashboard/bin' ? 'text-indigo-500' : 'text-gray-900')}>
                                    <span><DeleteOutlineIcon /> </span>
                                    <span>Bin</span>
                                </p>
                            </Link>
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

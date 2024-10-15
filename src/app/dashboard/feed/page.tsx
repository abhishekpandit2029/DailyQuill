"use client"

import clsx from "clsx";
import { useState } from "react";
import { MdOutlinePersonSearch } from "react-icons/md";
import { Input } from 'antd';
import SearchUserSidebar from "@/components/Dashboard/SearchUserSidebar";
import CardSkeleton from "@/components/Dashboard/CardSkeleton";
import Grid from "@mui/material/Grid";

export default function FeedPage() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <div className={clsx("flex", open ? "space-x-3" : "space-x-0")}>
                <div className="bg-white w-full flex flex-col space-y-4 place-content-center ml-0 lap:ml-4 lg:flex h-fit p-1">
                    <div className="rounded-2xl ring-1 ring-gray-200 lg:flex w-full p-3 tab:p-4">
                        <div className="w-full flex flex-row space-x-4 items-center justify-between">
                            <p className="font-semibold text-2xl">Feed</p>
                            <MdOutlinePersonSearch className="text-2xl cursor-pointer" onClick={() => setOpen(!open)} />
                        </div>
                    </div>
                    <div className="rounded-2xl ring-1 ring-gray-200 lg:flex w-full p-3 tab:p-4">
                        <div className="w-full flex flex-row space-x-4 items-center">
                            <Grid container wrap="wrap" gap={3} justifyContent={"start"}>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <CardSkeleton key={index} />
                                ))}
                            </Grid>
                        </div>
                    </div>
                </div>
                <div
                    style={{ backgroundColor: '#FEFEFE' }}
                    className={`transition-all duration-700 ease-in-out ${open ? 'max-w-lg opacity-100' : 'max-w-0 opacity-0'
                        } overflow-y-scroll scrollbar-hide overflow-x-auto h-screen w-[22rem]`}
                >
                    <SearchUserSidebar />
                </div>
            </div>
        </>
    )
}

"use client"

import clsx from "clsx";
import { useState } from "react";
import { MdOutlinePersonSearch } from "react-icons/md";
import SearchUserSidebar from "@/components/Dashboard/SearchUserSidebar";
import CardSkeleton from "@/components/Dashboard/CardSkeleton";
import Grid from "@mui/material/Grid";
import { useGetQuery } from "@/lib/fetcher";
import { truncateString } from "@/constants/format";
import { Image } from "antd"
import { defaultProfileImage } from "@/constants/strings";
import { IGetCardsData } from "../bin/page";
import { useRouter } from "next/navigation";

export default function FeedPage() {
    const [open, setOpen] = useState<boolean>(true)
    const { push } = useRouter()
    const { data, isLoading } = useGetQuery<IGetCardsData>(`/thoughtcard/getcardsdata`);

    const filteredData = data?.thoughtCards?.filter((items: any) => items?.isSoftDelete === false)

    return (
        <>
            <div className={clsx("flex", open ? "space-x-4" : "space-x-0")}>
                <div className="bg-white ml-0 lap:ml-4 flex flex-col space-y-4 w-full h-[calc(100vh-4rem)] p-[0.1rem]">
                    <div className="rounded-xl ring-1 ring-gray-200 lg:flex w-full p-3">
                        <div className="w-full flex flex-row space-x-4 items-center justify-between">
                            <p className="font-semibold text-[1.5rem]">Feed</p>
                            <MdOutlinePersonSearch className="text-2xl cursor-pointer" onClick={() => setOpen(!open)} />
                        </div>
                    </div>

                    <div className="bg-white flex flex-col space-y-1 rounded-xl ring-1 ring-gray-200 overflow-y-scroll scrollbar-hide overflow-x-auto">
                        {isLoading ? (
                            <div className="bg-white flex flex-col space-y-1 rounded-xl ring-1 ring-gray-200 lg:flex h-full">
                                <Grid container wrap="wrap" gap={2} justifyContent={"start"} padding={1.5}>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <CardSkeleton key={index} />
                                    ))}
                                </Grid>
                            </div>
                        ) :
                            (
                                <div
                                    className="columns-1 mob:columns-2 tab:columns-3 lap:columns-4 space-y-4 gap-3 tab:gap-4 p-3.5"
                                >
                                    {Array.isArray(filteredData) &&
                                        filteredData?.map((items, index) => (
                                            <div key={index} className="break-inside-avoid ring-1 ring-inset ring-gray-300 p-4 rounded-xl flex flex-col space-y-3 min-w-fit h-fit">
                                                <div className='flex space-x-3 items-center cursor-pointer' onClick={() => push(`/dashboard/feed/${items?.username}?id=${items?.userID}`)}>
                                                    <Image src={items?.userprofileImage || defaultProfileImage} alt={'profile_img'} className="rounded-full max-w-11 max-h-11" preview={false} />
                                                    <div>
                                                        <p className='text-[0.9rem]'>{items?.username.charAt(0).toUpperCase() + items?.username.slice(1).toLowerCase()}</p>
                                                        <p className='text-[0.8rem]'>{items?.full_name}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="font-bold text-lg">{items?.title}</p>
                                                </div>
                                                <div className="cursor-pointer min-w-full">
                                                    <p>{truncateString(items?.content, 200)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">{items?.tags?.join(" ")}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                    </div>
                </div>
                <div
                    style={{ backgroundColor: '#FEFEFE' }}
                    className={`transition-all duration-700 h-[calc(100vh-4rem)] ease-in-out ${open ? 'max-w-lg opacity-100' : 'max-w-0 opacity-0'
                        }`}
                >
                    <SearchUserSidebar />
                </div>
            </div>
        </>
    )
}
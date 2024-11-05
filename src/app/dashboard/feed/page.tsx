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

interface IThoughtCardsData {
    title: string,
    content: string,
    tags: string[],
    username: string,
    full_name: string,
    userprofileImage: string,
    createdAt: string,
    updatedAt: string,
}

interface ICardModel {
    thoughtCards: IThoughtCardsData[]
}

export default function FeedPage() {
    const [open, setOpen] = useState<boolean>(true)
    const [isCardModalOpen, setCardModalOpen] = useState(false);
    const [cardViewData, setCardViewData] = useState<IThoughtCardsData>();
    const { data, isLoading } = useGetQuery<ICardModel>("/allUsers/getAllUsersCardsData");
    console.log(data, "data");

    const handleClickCardView = (entry: any) => {
        setCardModalOpen(true);
        setCardViewData(entry)
    };

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

                    <div className="bg-white flex flex-col space-y-1 rounded-2xl ring-1 ring-gray-200 lg:flex min-h-full">
                        {isLoading ? (
                            <div className="bg-white flex flex-col space-y-1 rounded-2xl ring-1 ring-gray-200 lg:flex h-full ">
                                <Grid container wrap="wrap" gap={3} justifyContent={"start"} padding={2}>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <CardSkeleton key={index} />
                                    ))}
                                </Grid>
                            </div>
                        ) :
                            (
                                <div className="flex gap-4 flex-wrap p-3 tab:p-4">
                                    {Array.isArray(data?.thoughtCards) &&
                                        data?.thoughtCards?.map((items, index) => (
                                            <div key={index} className="ring-1 ring-inset ring-gray-300 p-4 rounded-2xl flex flex-col space-y-3 w-full tab:max-w-[18rem] h-fit">
                                                <div className='flex space-x-3 items-center'>
                                                    <Image src={items?.userprofileImage || defaultProfileImage} alt={'profile_img'} className="rounded-full max-w-11 max-h-11" preview={false} />
                                                    <div>
                                                        <p className='text-[0.9rem]'>{items?.username.charAt(0).toUpperCase() + items?.username.slice(1).toLowerCase()}</p>
                                                        <p className='text-[0.8rem]'>{items?.full_name}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="font-bold text-lg">{items?.title}</p>
                                                </div>
                                                <div className="cursor-pointer" onClick={() => handleClickCardView(items)}>
                                                    <p>{truncateString(items?.content, 100)}</p>
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
                    className={`transition-all duration-700 ease-in-out ${open ? 'max-w-lg opacity-100' : 'max-w-0 opacity-0'
                        } overflow-y-scroll scrollbar-hide overflow-x-auto h-screen w-[24rem]`}
                >
                    <SearchUserSidebar />
                </div>
            </div>
        </>
    )
}

"use client"

import { useState } from "react";
import { Divider, message } from "antd";
import { truncateString } from "@/constants/format";
import CardViewModel from "@/components/Modals/CardViewModel";
import { useGetQuery } from "@/lib/fetcher";
import CardSkeleton from "@/components/Dashboard/CardSkeleton";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import ProfilePic from "@/stuff/pxfuel.jpg"
import ProfileSkeleton from "@/components/Dashboard/ProfileSkeleton";
import { TiLocationArrowOutline } from "react-icons/ti";
import { MdOutlineModeComment } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { Button } from "@mui/base/Button";
import { buttonClassName } from "@/constants/strings";
import useParams from "@/hooks/useParams";

export interface IThoughtCards {
    title: string,
    content: string,
    tags: string[],
    _id: string;
}

interface IGetCardsData {
    thoughtCards: IThoughtCards[]
}


interface IUserData {
    _id: string,
    username: string,
    full_name: string,
    bio: string,
    link: string,
    link_alias: string,
}

interface IGetUserData {
    users: IUserData[]
}

export default function UserFeedPage({ params }: { params: { userfeed: string } }) {
    const [isCardModalOpen, setCardModalOpen] = useState(false);
    const [cardViewData, setCardViewData] = useState<IThoughtCards>();
    const { get } = useParams()

    const ID = get('id')
    const username = params?.userfeed

    const { data, isLoading } = useGetQuery<IGetCardsData>(`/thoughtcard/getcardsdata?username=${username}`);

    const { data: profileData } = useGetQuery<IGetUserData>(`/users/getUsers?searchQuery=${ID}`
    );
    console.log("profileData", profileData)

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        message.success("Content copied successfully");
    };
    const handleClickCardView = (entry: any) => {
        setCardModalOpen(true);
        setCardViewData(entry)
    };

    const filteredData = data?.thoughtCards?.filter((items: any) => items?.isSoftDelete === false)

    return (
        <div className="bg-white flex flex-col space-y-4 place-content-center my-3 tab:my-1 ml-0 lap:ml-4 lg:flex h-fit">
            {isCardModalOpen && (
                <CardViewModel
                    handleCancel={() => {
                        setCardModalOpen(false);
                    }}
                    isModalOpen={isCardModalOpen}
                    initialData={cardViewData}
                />
            )}
            <div className="rounded-2xl ring-1 ring-gray-200 lg:flex w-full p-3 tab:p-4">
                {isLoading ? (
                    <ProfileSkeleton />
                ) : (

                    <div className="w-full lap:w-4/5 flex flex-col space-y-4">
                        <div className="flex space-x-8 items-center">
                            <div className="flex tab:space-x-12 space-y-4 tab:space-y-0 space-x-0 items-center flex-col tab:flex-row rounded-full ring-2 ring-indigo-400">
                                <Image src={ProfilePic} alt="profile-pic" className="rounded-full max-w-[7rem]" />
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex flex-col items-center"><p className="font-semibold text-[1.2rem]">12</p><p className="font-medium text-base">Posts</p></div>
                                <div className="flex flex-col items-center"><p className="font-semibold text-[1.2rem]">874</p><p className="font-medium text-base">Followers</p></div>
                                <div className="flex flex-col items-center"><p className="font-semibold text-[1.2rem]">232</p><p className="font-medium text-base">Followings</p></div>
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold text-[1.2rem] mb-2">{profileData?.users[0]?.full_name}</p>
                            <p className="font-medium text-base text-gray-600 mb-1">{profileData?.users[0]?.bio}</p>
                            <a className="font-medium text-base text-indigo-500 flex space-x-1 items-center" href={profileData?.users[0]?.link || ""}><span>{profileData?.users[0]?.link_alias} </span><span><TiLocationArrowOutline className="text-lg" /></span>
                            </a>
                        </div>

                        <div className="flex space-x-4">
                            <Button
                                className={buttonClassName}
                            >
                                Follow
                            </Button >
                            <Button
                                className={buttonClassName}
                            >
                                Message
                            </Button >
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white flex flex-col space-y-1 rounded-2xl ring-1 ring-gray-200 lg:flex h-full ">
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
                        <div className="grid grid-cols-1 tab:grid-cols-3 lap:grid-cols-4 desk:grid-cols-5 gap-3 tab:gap-4 p-3 tab:p-4">
                            {Array.isArray(filteredData) &&
                                filteredData.map((items, index) => (
                                    <div key={index} className="ring-1 ring-inset ring-gray-300 p-4 rounded-2xl flex flex-col space-y-3 w-full tab:max-w-[18rem] h-fit">
                                        <div>
                                            <p className="font-bold text-lg">{items?.title}</p>
                                        </div>
                                        <div className="cursor-pointer" onClick={() => handleClickCardView(items)}>
                                            <p>{truncateString(items?.content, 100)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">{items?.tags?.join(" ")}</p>
                                        </div>
                                        <Divider />
                                        <div className="flex space-x-4 justify-end items-center">
                                            <FaRegHeart className="font-bold text-xl" />
                                            <MdOutlineModeComment className="font-bold text-xl" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )}
            </div>
        </div>
    );
}
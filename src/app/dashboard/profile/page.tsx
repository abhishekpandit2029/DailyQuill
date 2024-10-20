"use client"

import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import AddToDairyModel from "@/components/Modals/AddToDairyModel";
import EditCardContentModel from "@/components/Modals/EditCardContentModel";
import { FaRegEdit } from "react-icons/fa";
import { Divider, message, Rate } from "antd";
import { SoftDeleteAction } from "@/components/Dashboard/CardActions";
import { truncateString } from "@/constants/format";
import CardViewModel from "@/components/Modals/CardViewModel";
import { useGetQuery } from "@/lib/fetcher";
import CardSkeleton from "@/components/Dashboard/CardSkeleton";
import Grid from "@mui/material/Grid";
import { Image } from "antd";
import AddIcon from '@mui/icons-material/Add';
import useMe from "@/hooks/useMe";
import clsx from "clsx";
import ProfileSkeleton from "@/components/Dashboard/ProfileSkeleton";
import { TiLocationArrowOutline } from "react-icons/ti";
import { IoHeart } from "react-icons/io5";
import FollowersFollowingsSidebar from "@/components/Dashboard/FollowersFollowingsSidebar";

export interface IThoughtCards {
    title: string,
    content: string,
    tags: string[],
    _id: string;
    userprofile_image: string
}

interface IGetCardsData {
    thoughtCards: IThoughtCards[]
}

export default function ProfilePage() {
    const [selectedEntry, setSelectedEntry] = useState<IThoughtCards>();
    const [cardViewData, setCardViewData] = useState<IThoughtCards>();
    const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
    const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
    const [isCardModalOpen, setCardModalOpen] = useState(false);
    const [sidebarType, setSidebarType] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const { userData, isLoading: isMeLoading } = useMe()

    const { data, isLoading } = useGetQuery<IGetCardsData>(`/thoughtcard/getcardsdata?username=${userData?.data?.username}`);

    const handleClick = (entry: any) => {
        setSelectedEntry(entry);
        setIsEditCardModalOpen(true);
    };

    const handleClickCardView = (entry: any) => {
        setCardModalOpen(true);
        setCardViewData(entry)
    };

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        message.success("Content copied successfully");
    };

    function handleclickFollowers() {
        if (sidebarType === "Followers" && open) {
            setOpen(false);
        } else {
            setSidebarType("Followers");
            setOpen(true);
        }
    }

    function handleclickFollowings() {
        if (sidebarType === "Followings" && open) {
            setOpen(false);
        } else {
            setSidebarType("Followings");
            setOpen(true);
        }
    }

    const filteredData = data?.thoughtCards?.filter((items: any) => items?.isSoftDelete === false)

    return (
        <div className="flex space-x-4">
            <div className={clsx("bg-white flex place-content-center my-3 tab:my-1 ml-0 lap:ml-4 h-fit", open ? "space-x-4" : "space-x-0")}>
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
                {isEditCardModalOpen && (
                    <EditCardContentModel
                        handleCancel={() => {
                            setIsEditCardModalOpen(false);
                        }}
                        isModalOpen={isEditCardModalOpen}
                        initialData={selectedEntry}
                        onSave={() => {
                            setIsEditCardModalOpen(false);
                        }}
                        onCancel={() => {
                            setIsEditCardModalOpen(false);
                        }}
                    />
                )}
                {isCardModalOpen && (
                    <CardViewModel
                        handleCancel={() => {
                            setCardModalOpen(false);
                        }}
                        isModalOpen={isCardModalOpen}
                        initialData={cardViewData}
                    />
                )}

                <div className="flex flex-col space-y-4 place-content-center h-fit">
                    <div className="rounded-2xl ring-1 ring-gray-200 lg:flex w-full p-3 tab:p-4">
                        {isMeLoading ? (
                            <ProfileSkeleton />
                        ) : (
                            <div className="w-full lap:w-4/5 flex flex-col space-y-4">
                                <div className="flex space-x-8 items-center">
                                    <div className="flex tab:space-x-12 space-y-4 tab:space-y-0 space-x-0 items-center flex-col tab:flex-row rounded-full ring-2 ring-indigo-400">
                                        <Image src={userData?.data?.userprofile_image} alt="profile-pic" className="rounded-full max-w-[7rem]" preview={false} />
                                    </div>
                                    <div className="flex space-x-4">
                                        <div className="flex flex-col items-center"><p className="font-semibold text-[1.2rem]">{filteredData?.length || 0}</p><p className="font-medium text-base">Posts</p></div>

                                        <div className="flex flex-col items-center cursor-pointer" onClick={handleclickFollowers}><p className="font-semibold text-[1.2rem]">{userData?.data?.followersLists?.length || 0}</p><p className="font-medium text-base">Followers</p></div>

                                        <div className="flex flex-col items-center cursor-pointer" onClick={handleclickFollowings}><p className="font-semibold text-[1.2rem]">{userData?.data?.followingsLists?.length || 0}</p><p className="font-medium text-base">Followings</p></div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xl font-semibold mb-2">{userData?.data?.full_name}</p>
                                    <p className="text-base font-medium text-gray-600 mb-1">{userData?.data?.bio}</p>
                                    <a className="text-base font-medium text-indigo-500 flex space-x-1 items-center" href={userData?.data?.link || ""}><span>{userData?.data?.link_alias} </span><span> {userData?.data?.link_alias && <TiLocationArrowOutline className="text-lg" />}</span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        className={clsx(
                            "cursor-pointer border-dashed border-2 border-gray-200 flex justify-center rounded-2xl p-3",
                            filteredData && filteredData.length > 0 ? "block" : "hidden"
                        )}
                        onClick={() => {
                            setIsAddNewModalOpen(true);
                        }}
                    >
                        <AddIcon /> Add New
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
                                filteredData && filteredData?.length <= 0 ?
                                    <div className="grid grid-cols-1 tab:grid-cols-3 lap:grid-cols-4 desk:grid-cols-5 gap-3 tab:gap-4 p-3 tab:p-4">
                                        <div className="cursor-pointer border-dashed border-2 border-gray-200 p-4 rounded-2xl flex flex-col space-y-3 w-full tab:max-w-[18rem] h-[16rem] justify-center items-center text-center" onClick={() => {
                                            setIsAddNewModalOpen(true);
                                        }}>
                                            <AddIcon /> Add Your First One From Here.
                                        </div>
                                    </div> :

                                    <div className="grid grid-cols-1 tab:grid-cols-3 lap:grid-cols-4 desk:grid-cols-5 gap-3 tab:gap-4 p-3 tab:p-4">
                                        {Array.isArray(filteredData) &&
                                            filteredData?.map((items, index) => (
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
                                                        <Rate character={<IoHeart className="text-[1.8rem] mt-1" />} count={1} className="text-red-700" />
                                                        <FaRegEdit
                                                            className="cursor-pointer text-lg tab:text-xl hover:text-indigo-500 hover:scale-110 ease-in-out transition duration-200"
                                                            onClick={() => handleClick(items)}
                                                        />
                                                        <FaRegCopy
                                                            className="cursor-pointer text-lg tab:text-xl hover:text-indigo-500 hover:scale-110 ease-in-out transition duration-200"
                                                            onClick={() => handleCopy(items?.content)}
                                                        />
                                                        <SoftDeleteAction record={items} />
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
                        } overflow-y-scroll scrollbar-hide overflow-x-auto min-h-full w-[28rem]`}
                >
                    <FollowersFollowingsSidebar type={sidebarType} data={(sidebarType === "Followers" ? userData?.data?.followersLists : userData?.data?.followingsLists) || []} />
                </div>
            </div>


        </div >
    );
}

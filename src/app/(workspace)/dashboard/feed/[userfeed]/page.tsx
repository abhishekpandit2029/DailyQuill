"use client"

import { useState } from "react";
import { Divider, message } from "antd";
import { truncateString } from "@/constants/format";
import CardViewModel from "@/components/Modals/CardViewModel";
import { useGetQuery, usePatchMutation } from "@/lib/fetcher";
import CardSkeleton from "@/components/Dashboard/CardSkeleton";
import Grid from "@mui/material/Grid";
import { Image } from "antd";
import ProfileSkeleton from "@/components/Dashboard/ProfileSkeleton";
import { TiLocationArrowOutline } from "react-icons/ti";
import { MdOutlineModeComment } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { Button } from "@mui/base/Button";
import { buttonClassName } from "@/constants/strings";
import useParams from "@/hooks/useParams";
import { useUpdateMe } from "@/hooks/useUpdateMe";
import useMe from "@/hooks/useMe";
import FollowersFollowingsSidebar from "@/components/Dashboard/FollowersFollowingsSidebar";
import clsx from "clsx";
import revalidate from "@/lib/revalidate";

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

interface IFollowersFollowings {
    follower_id: string,
    follower_username: string,
    follower_full_name: string,
    follower_profile_image: string,
}

interface IUserData {
    _id: string,
    username: string,
    full_name: string,
    bio: string,
    link: string,
    link_alias: string,
    userprofile_image: string
    followersLists: IFollowersFollowings[],
    followingsLists: IFollowersFollowings[],
    followers: number,
    followings: number,
}

interface IGetUserData {
    users: IUserData[]
}

export default function UserFeedPage({ params }: { params: { userfeed: string } }) {
    const [isCardModalOpen, setCardModalOpen] = useState(false);
    const [sidebarType, setSidebarType] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const [cardViewData, setCardViewData] = useState<IThoughtCards>();
    const { update: followTrigger } = useUpdateMe()
    const { userData } = useMe()
    const { get } = useParams()
    const ID = get('id')
    const username = params?.userfeed
    const isFollow = userData?.data?.followingsLists?.some(item => item?.follower_id === ID)

    const { data, isLoading } = useGetQuery<IGetCardsData>(`/thoughtcard/getcardsdata?userID=${ID}`);

    const { data: profileData } = useGetQuery<IGetUserData>(`/users/getUsers?searchQuery=${ID}`
    );

    const { trigger: unfollowTrigger } = usePatchMutation("/users/unfollowuser", {
        onSuccess: () => {
            revalidate("/users/me");
            revalidate("/users/getUsers");
        },
        onError: (error) => {
            message.error(error.message);
        },
    });


    function handleChange() {
        if (isFollow) {
            unfollowTrigger({
                id: userData?.data?._id, followersId: ID
            })

            unfollowTrigger({
                id: ID, followersId: userData?.data?._id
            })
        } else {
            followTrigger({
                id: userData?.data?._id, followingsLists: [
                    {
                        follower_id: ID,
                        follower_username: username,
                        follower_full_name: profileData?.users[0]?.full_name,
                        follower_profile_image: profileData?.users[0]?.userprofile_image,
                    }
                ]
            })

            followTrigger({
                id: ID, followersLists: [
                    {
                        follower_id: userData?.data?._id,
                        follower_username: userData?.data?.username,
                        follower_full_name: userData?.data?.full_name,
                        follower_profile_image: userData?.data?.userprofile_image,
                    }
                ]
            })
        }
    }

    const handleClickCardView = (entry: any) => {
        setCardModalOpen(true);
        setCardViewData(entry)
    };

    const filteredData = data?.thoughtCards?.filter((items: any) => items?.isSoftDelete === false)

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

    return (
        <div className={clsx("bg-white flex my-3 tab:my-1 ml-0 lap:ml-4 h-fit", open ? "space-x-4" : "space-x-0")}>
            {isCardModalOpen && (
                <CardViewModel
                    handleCancel={() => {
                        setCardModalOpen(false);
                    }}
                    isModalOpen={isCardModalOpen}
                    initialData={cardViewData}
                />
            )}
            <div className="flex flex-col space-y-4 w-full h-fit">
                <div className="rounded-2xl ring-1 ring-gray-200 lg:flex w-full p-3 tab:p-4">
                    {isLoading ? (
                        <ProfileSkeleton />
                    ) : (

                        <div className="w-full lap:w-4/5 flex flex-col space-y-4">
                            <div className="flex space-x-8 items-center">
                                <div className="flex tab:space-x-12 space-y-4 tab:space-y-0 space-x-0 items-center flex-col tab:flex-row rounded-full ring-2 ring-indigo-400">
                                    <Image src={profileData?.users[0]?.userprofile_image} alt="profile-pic" className="rounded-full max-w-[7rem]" preview={false} />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex flex-col items-center"><p className="font-semibold text-[1.2rem]">{filteredData?.length || 0}</p><p className="font-medium text-base">Posts</p></div>

                                    <div className="flex flex-col items-center cursor-pointer" onClick={handleclickFollowers}><p className="font-semibold text-[1.2rem]">{profileData?.users[0]?.followersLists?.length || 0}</p><p className="font-medium text-base">Followers</p></div>

                                    <div className="flex flex-col items-center cursor-pointer" onClick={handleclickFollowings}><p className="font-semibold text-[1.2rem]">{profileData?.users[0]?.followingsLists?.length || 0}</p><p className="font-medium text-base">Followings</p></div>
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
                                    onClick={handleChange}
                                >
                                    {isFollow ? "Unfollow" : "Follow"}
                                </Button >
                                {/* <Button
                                className={buttonClassName}
                            >
                                Message
                            </Button > */}
                            </div>
                        </div>
                    )}
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
            <div
                style={{ backgroundColor: '#FEFEFE' }}
                className={`transition-all duration-700 ease-in-out ${open ? 'max-w-lg opacity-100' : 'max-w-0 opacity-0'
                    } overflow-y-scroll scrollbar-hide overflow-x-auto min-h-screen w-[28rem]`}
            >
                <FollowersFollowingsSidebar type={sidebarType} data={(sidebarType === "Followers" ? profileData?.users[0]?.followersLists : profileData?.users[0]?.followingsLists) || []} />
            </div>
        </div>
    );
}
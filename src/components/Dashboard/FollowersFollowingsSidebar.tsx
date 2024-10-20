import { useGetQuery } from '@/lib/fetcher';
import { Empty, Input } from 'antd'
import { Image } from 'antd';
import React, { useState } from 'react'
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import { buttonClassName, defaultProfileImage } from '@/constants/strings';
import { IFollowersFollowings } from '@/hooks/useMe';
import { Button } from "@mui/base/Button";

interface IUserData {
    _id: any;
    username: string,
    full_name: string,
    userprofile_image: string
}

interface IGetUserData {
    users: IUserData[]
}

interface ISidebarProps {
    type: string
    data: IFollowersFollowings[]
}

export default function FollowersFollowingsSidebar(props: ISidebarProps) {
    const { type, data: sidebarData } = props
    const { push } = useRouter()

    function handleClick(id: string, username: string) {
        push(`/dashboard/feed/${username}?id=${id}`)
    }

    return (
        <div className="w-full flex-col space-y-4 p-1 flex h-full">
            <div className="rounded-2xl ring-1 ring-gray-200 lg:flex w-full p-3 tab:p-4 h-full flex flex-col space-y-4">
                <p className='font-semibold text-xl'>{type}</p>
                <div className='flex flex-col space-y-3 w-full h-full'>
                    {
                        sidebarData?.length > 0 ?
                            <>{
                                sidebarData?.map((item) => {
                                    return (
                                        <div
                                            key={item?.follower_id}
                                            className="flex items-center bg-white p-3 rounded-2xl justify-between"
                                            style={{ boxShadow: "rgba(149, 157, 165, 0.1) 0px 8px 24px" }}
                                        >
                                            <div className='flex space-x-3 items-center'>
                                                <Image src={item?.follower_profile_image || defaultProfileImage} alt={'profile_img'} className="rounded-full max-w-11 max-h-11" preview={false} />
                                                <div>
                                                    <p className='text-[0.9rem]'>{item?.follower_username}</p>
                                                    <p className='text-[0.8rem]'>{item?.follower_full_name}</p>
                                                </div>
                                            </div>
                                            <div onClick={() => handleClick(item?.follower_id, item?.follower_username)}>
                                                <HiMiniArrowTopRightOnSquare style={{ color: "grey", fontSize: "1.2rem" }} className='cursor-pointer' />
                                            </div>
                                        </div>
                                    );
                                })
                            }</>
                            :
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                className='flex flex-col justify-center items-center'
                                imageStyle={{ height: 60 }}
                                description={
                                    <p>
                                        No {type} yet
                                    </p>
                                }
                            >
                                <Button className={buttonClassName} onClick={() => push(`/dashboard/feed`)}>Make new Friends</Button>
                            </Empty>
                    }
                </div>
            </div>
        </div >
    )
}
import { useGetQuery, usePostMutation } from '@/lib/fetcher';
import { Input } from 'antd'
import { Image } from 'antd';
import React, { useState } from 'react'
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import { defaultProfileImage } from '@/constants/strings';
import useMe from '@/hooks/useMe';
import useParams from '@/hooks/useParams';

interface IChatRequest {
    sender: string
    receiver: string
}

interface IChatResponse {
    error: string,
    success: boolean,
}

export default function ChatSearchUserSidebar() {
    const [searchItems, setSearchItems] = useState<string>("")

    const { userData } = useMe()

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItems(e.target.value)
    };

    const { trigger: chatTrigger } = usePostMutation<IChatRequest, IChatResponse>("/chat/create");

    const handleClick = (values: string) => {
        chatTrigger({
            sender: userData?.data?._id || '',
            receiver: values
        })
    }

    return (
        <div className="w-full flex-col space-y-4 flex h-full p-[0.1rem]">
            <div className="rounded-xl ring-1 ring-gray-200 lg:flex w-full p-2">
                <div className="w-full flex flex-row space-x-4 items-center">
                    <Input
                        variant="borderless"
                        placeholder="Search people"
                        onChange={onSearch}
                        style={{ color: 'black', borderRadius: "0.7rem", padding: 8, fontSize: 17, border: "none" }}
                    />
                </div>
            </div>
            <div className="w-full flex-col space-y-4 flex overflow-y-scroll scrollbar-hide overflow-x-auto p-[0.1rem]  rounded-xl ring-1 ring-gray-200 lg:flex">
                <div className='flex flex-col space-y-3 w-full p-4'>
                        {
                            userData?.data?.followingsLists?.map((item) => {
                                return (
                                    <div
                                        key={item?.follower_id}
                                        className="flex items-center cursor-pointer bg-white p-3 rounded-xl justify-between"
                                        style={{ boxShadow: "rgba(149, 157, 165, 0.1) 0px 8px 24px" }}
                                        onClick={() => handleClick(item?.follower_id)}
                                    >
                                        <div className='flex space-x-3 items-center'>
                                            <Image src={item?.follower_profile_image || defaultProfileImage} alt={'profile_img'} className="rounded-full max-w-11 max-h-11" preview={false} />
                                            <div>
                                                <p className='text-[0.9rem]'>{item?.follower_username}</p>
                                                <p className='text-[0.8rem]'>{item?.follower_full_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
        </div>
    )
}
"use client"

import { defaultProfileImage } from "@/constants/strings";
import useParams from "@/hooks/useParams";
import { useGetQuery } from "@/lib/fetcher";
import { Image } from 'antd';

interface IUserData {
    _id: string,
    username: string,
    full_name: string,
    userprofile_image: string
}

interface IGetUserData {
    users: IUserData[]
}

interface MainInboxProps {
    cid: string;
}

export default function MainInbox({ cid }: MainInboxProps) {
    const { data } = useGetQuery<IGetUserData>(`/users/getUsers?searchQuery=${cid?.split("-")?.[1]}`);
    return (
        <div>
            <div
                className="bg-white p-3 rounded-2xl w-full"
                style={{ boxShadow: "rgba(149, 157, 165, 0.1) 0px 8px 24px" }}
            >
                <div className='flex space-x-3 items-center w-full'>
                    <Image src={data?.users?.[0]?.userprofile_image || defaultProfileImage} alt={'profile_img'} className="rounded-full max-w-11 max-h-11" preview={false} />
                    <div>
                        <p className='text-[0.9rem]'>{data?.users?.[0]?.full_name}</p>
                        <p className='text-[0.8rem]'>{data?.users?.[0]?.username}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
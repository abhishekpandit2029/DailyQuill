"use client"

import { defaultProfileImage } from "@/constants/strings";
import useParams from "@/hooks/useParams";
import { useGetQuery } from "@/lib/fetcher";
import { Image, Input } from 'antd';
import { LuSend } from "react-icons/lu";
import Messages from "./Messages";
import { useCookies } from "react-cookie";
import useMe from "@/hooks/useMe";

interface IUserData {
    _id?: string,
    username?: string,
    full_name?: string,
    userprofile_image?: string
    id?: string;
    fullName?: string;
    picture?: string | undefined;
}

interface IGetUserData {
    users: IUserData[]
}

interface MainInboxProps {
    chatRecord: IUserData;
}

const chatData = [
    {
        "id": "f9dDueR0JbLPWrrMgUtmL",
        "senderId": "6749c25042287b45549efc4c",
        "text": "im fine.",
        "timestamp": 1743263222889
    },
    {
        "id": "Rl-XrdvyzLaS2kjeUIHX_",
        "senderId": "6705525ac5d04e0eb88eb0e8",
        "text": "how are you",
        "timestamp": 1743263208186
    },
    {
        "id": "qLQnOv2t-GRd6lua5oDDD",
        "senderId": "6705525ac5d04e0eb88eb0e8",
        "text": "hiii",
        "timestamp": 1743263198347
    },
    {
        "id": "PIFT-T-vC92n5J0UArXRQ",
        "senderId": "6749c25042287b45549efc4c",
        "text": "hello",
        "timestamp": 1743263143730
    }
]

export default function MainInbox({ chatRecord }: MainInboxProps) {
    const [{ userId }] = useCookies(["userId"]);
    const { userData } = useMe()
    return (
        <div className="flex flex-col justify-between h-full">
            <div
                className="bg-white p-3 rounded-2xl w-full"
                style={{ boxShadow: "rgba(149, 157, 165, 0.1) 0px 8px 24px" }}
            >
                <div className='flex space-x-3 items-center w-full'>
                    <Image src={chatRecord?.picture || defaultProfileImage} alt={'profile_img'} className="rounded-full max-w-11 max-h-11" preview={false} />
                    <div>
                        <p className='text-[0.9rem]'>{chatRecord?.fullName}</p>
                        <p className='text-[0.8rem]'>{chatRecord?.username}</p>
                    </div>
                </div>
            </div>
            <Messages initialMessages={chatData} sessionId={userId} chatId={`${userId}-${chatRecord?.id}`} sessionImg={userData?.data?.userprofile_image || defaultProfileImage} chatPartner={chatRecord} />
            <div className="mt-auto">
                <Input className="w-full rounded-lg p-3" placeholder="Write something..." suffix={<LuSend className="text-xl cursor-pointer" />} />
            </div>
        </div>

    )
}
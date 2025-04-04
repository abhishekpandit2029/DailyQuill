"use client"

import { defaultProfileImage } from "@/constants/strings";
import { usePostMutation } from "@/lib/fetcher";
import { Image, Input } from 'antd';
import { LuSend } from "react-icons/lu";
import Messages from "./Messages";
import { useCookies } from "react-cookie";
import useMe from "@/hooks/useMe";
import { useState } from "react";

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

interface IMessageRequest {
    chatId: string
    senderId: string
    receiverId: string | undefined
    text: string
    participants: string[]
}

interface IMessageResponse {
    success: string
    error: string
}

interface IMessageData {
    chats: {
        _id: string
        text: string,
        timestamp: string,
        senderId: string,
    }[]
}

export default function MainInbox({ chatRecord }: MainInboxProps) {
    const [{ userId }] = useCookies(["userId"]);
    const { userData } = useMe()
    const [sendMessage, setSendMessage] = useState<string>("")

    const { trigger: messageTrigger } = usePostMutation<IMessageRequest, IMessageResponse>("/message/send", {
        onSuccess: () => {
            setSendMessage("");
        }
    });

    function handlerSendMessage() {
        if (sendMessage?.trim().length > 0) {
            messageTrigger({
                chatId: `${userId}-${chatRecord?.id}`,
                senderId: userId,
                receiverId: chatRecord?.id,
                text: sendMessage,
                participants: [userId, chatRecord?.id]
            });
        }
    }

    return (
        <div className="bg-white flex-col flex space-y-2 w-full h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide p-[0.1rem]">
            <div
                className="bg-white p-3 rounded-xl w-full"
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
            <Messages sessionId={userId} chatId={`${userId}-${chatRecord?.id}`} sessionImg={userData?.data?.userprofile_image || defaultProfileImage} chatPartner={chatRecord} />
            <div className="mt-auto">
                <Input
                    className="w-full rounded-lg p-3"
                    value={sendMessage}
                    onChange={(e) => setSendMessage(e.target.value)}
                    onPressEnter={handlerSendMessage}
                    placeholder="Write something..."
                    suffix={
                        <LuSend
                            onClick={handlerSendMessage}
                            className="text-xl cursor-pointer"
                        />
                    }
                />
            </div>
        </div>
    )
}
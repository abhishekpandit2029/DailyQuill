"use client"

import { defaultProfileImage } from "@/constants/strings";
import { usePostMutation } from "@/lib/fetcher";
import { Image, Input } from 'antd';
import { LuSend } from "react-icons/lu";
import Messages from "./Messages";
import { useCookies } from "react-cookie";
import useMe from "@/hooks/useMe";
import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/lib/socket";

interface IUserData {
    isOnline?: string;
    _id?: string;
    username?: string;
    full_name?: string;
    userprofile_image?: string;
    id?: string;
    fullName?: string;
    picture?: string | undefined;
}

interface MainInboxProps {
    chatRecord: IUserData;
}

interface IMessageRequest {
    chatId: string;
    senderId: string;
    receiverId: string | undefined;
    text: string;
    participants: string[];
}

interface IMessageResponse {
    success: string;
    error: string;
}

export default function MainInbox({ chatRecord }: MainInboxProps) {
    const [{ userId }] = useCookies(["userId"]);
    const { userData } = useMe();
    const [sendMessage, setSendMessage] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const socket = useRef(getSocket());
    const currentSocket = socket.current
    console.log("chatRecord", chatRecord)

    const { trigger: messageTrigger } = usePostMutation<IMessageRequest, IMessageResponse>(
        "/message/send",
        {
            onSuccess: () => {
                setSendMessage("");
            },
        }
    );

    function handlerSendMessage() {
        if (sendMessage?.trim().length > 0) {
            messageTrigger({
                chatId: `${userId}-${chatRecord?.id}`,
                senderId: userId,
                receiverId: chatRecord?.id,
                text: sendMessage,
                participants: [userId, chatRecord?.id],
            });
        }
    }

    const handleTyping = (e: { target: { value: React.SetStateAction<string> } }) => {
        currentSocket.emit("typing", {
            fromUserId: userId,
            toUserId: chatRecord?.id,
        });
        setSendMessage(e.target.value);
    };

    useEffect(() => {
        currentSocket.on("typing-status", (data) => {
            if (data.fromUserId !== userId) {
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false)
                }, 2000);
            }
        });

        return () => {
            currentSocket.off("typing-status");
        };
    }, [userId, currentSocket]);

    return (
        <div className="bg-white flex-col flex space-y-2 w-full h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide p-[0.1rem]">
            <div
                className="bg-white p-3 rounded-xl w-full"
                style={{ boxShadow: "rgba(149, 157, 165, 0.1) 0px 8px 24px" }}
            >
                <div className="flex space-x-3 items-center">
                    <div className="relative w-11 h-11">
                        <Image
                            src={chatRecord?.picture || defaultProfileImage}
                            alt={"profile_img"}
                            className="rounded-full max-w-11 max-h-11"
                            preview={false}
                        />
                        {chatRecord?.isOnline?.includes("dashboard") && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>}
                    </div>
                    <div className="w-full">
                        <p className="text-[0.9rem]">{chatRecord?.fullName}</p>
                        <p className="text-[0.8rem]">{chatRecord?.username}</p>
                    </div>
                </div>
            </div>

            <Messages
                sessionId={userId}
                chatId={`${userId}-${chatRecord?.id}`}
                sessionImg={userData?.data?.userprofile_image || defaultProfileImage}
                chatPartner={chatRecord}
            />

            <div className="mt-auto">
                {isTyping && (
                    <div className="flex items-center space-x-2 mb-2 ml-1 animate-bounce">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                        <p className="text-sm text-gray-600">@{userData?.data?.username} is typing…</p>
                    </div>
                )}
                <Input
                    className="w-full rounded-lg p-3"
                    value={sendMessage}
                    onChange={handleTyping}
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
    );
}

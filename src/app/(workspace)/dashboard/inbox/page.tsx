"use client"

import ChatSearchUserSidebar from "@/components/Dashboard/ChatSearchUserSidebar"
import MainInbox from "@/components/Main/Chat/MainInbox"
import { useGetQuery } from "@/lib/fetcher"
import { defaultProfileImage } from "@/constants/strings"
import useParams from "@/hooks/useParams"
import { pusherClient } from "@/helpers/getInitiatedPusher"
import { Splitter } from "antd"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { MdOutlinePersonSearch } from "react-icons/md"
import { Image } from 'antd';

interface Chat {
    chatId: string; // Unique chat identifier (e.g., "user123-user456")
    participants: string[]; // Users in the chat
    lastMessage?: string; // Stores the last message text
    lastMessageTime?: Date; // Timestamp of the last message

    receiverId: string;
    receiverUsername: string;
    receiverFullName: string;
    receiverPicture?: string;

    senderId: string;
    senderUsername: string;
    senderFullName: string;
    senderPicture?: string;
}

interface ChatResponse {
    success: boolean;
    chats: Chat[];
}

interface IChats {
    id: string;
    username: string;
    fullName: string;
    picture: string | undefined;
}

interface ChatFiltered {
    chats: Chat[]
}

export default function InboxPage() {
    const [open, setOpen] = useState<boolean>(false);
    const [chatData, setChatData] = useState<IChats | undefined>();
    const [{ userId }] = useCookies(["userId"]);

    const { data } = useGetQuery<ChatFiltered>(`/chat/user?userId=${userId}`);
    const [chats, setChats] = useState<Chat[]>(data?.chats || []);

    const PrimaryData: IChats[] = (chats?.map((item) => ({
        id: item?.senderId,
        username: item?.senderUsername,
        fullName: item?.senderFullName,
        picture: item?.senderPicture,
    })) || [])

    const SencondaryData: IChats[] = (chats?.map((item) => ({
        id: item?.receiverId,
        username: item?.receiverUsername,
        fullName: item?.receiverFullName,
        picture: item?.receiverPicture,
    })) || [])

    const CombinedChatData = [...PrimaryData, ...SencondaryData]?.filter((item) => item?.id !== userId);

    const handleClick = (values: IChats) => {
        setChatData(values);
    };

    useEffect(() => {
        if (!userId) return;

        pusherClient.subscribe(`chat-collection`);

        pusherClient.bind("new-chat", (newChat: Chat) => {
            setChats((prev) => [
                ...prev,
                {
                    chatId: newChat.chatId,
                    participants: newChat.participants,

                    receiverId: newChat.receiverId,
                    receiverUsername: newChat.receiverUsername,
                    receiverFullName: newChat.receiverFullName,
                    receiverPicture: newChat.receiverPicture,

                    senderId: newChat.senderId,
                    senderUsername: newChat.senderUsername,
                    senderFullName: newChat.senderFullName,
                    senderPicture: newChat.senderPicture,
                },
            ]);
        });

        return () => {
            pusherClient.unbind("new-chat");
            pusherClient.unsubscribe(`chat-collection`);
        };
    }, [userId]);

    useEffect(() => {
        if (data?.chats) {
            setChats(data.chats);
        }
    }, [data]);

    return (
        <>
            <div className="bg-white w-full flex space-x-2 pl-0 lap:pl-4 p-1">
                <div className="rounded-xl ring-1 w-1/5 ring-gray-200 lg:flex p-3 tab:p-4">
                    <Splitter layout="vertical">
                        <Splitter.Panel defaultSize="80%" min="20%" max="80%">
                            <div className="w-full flex flex-col space-y-4">
                                <div className="flex flex-row items-center justify-between">
                                    <p className="font-semibold text-2xl">Inbox</p>
                                    <MdOutlinePersonSearch className="text-2xl cursor-pointer" onClick={() => setOpen(!open)} />
                                </div>

                                <div className='flex flex-col space-y-3 w-full'>
                                    {
                                        CombinedChatData?.map((item) => {
                                            return (
                                                <div
                                                    key={item?.id}
                                                    className="flex items-center cursor-pointer bg-white p-3 rounded-xl justify-between"
                                                    style={{ boxShadow: "rgba(149, 157, 165, 0.1) 0px 8px 24px" }}
                                                    onClick={() => handleClick(item)}
                                                >
                                                    <div className='flex space-x-3 items-center'>
                                                        <Image src={item?.picture || defaultProfileImage} alt={'profile_img'} className="rounded-full max-w-11 max-h-11" preview={false} />
                                                        <div>
                                                            <p className='text-[0.9rem]'>{item?.fullName}</p>
                                                            <p className='text-[0.8rem]'>{item?.username}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </Splitter.Panel>
                        <Splitter.Panel defaultSize="20%" min="20%" max="80%">
                            <div className="w-full flex justify-between">
                                <p className="font-semibold text-2xl mt-2">Chat Request</p>
                            </div>
                        </Splitter.Panel>
                    </Splitter>
                </div>
                <div
                    style={{ backgroundColor: '#FEFEFE' }}
                    className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 w-1/5' : 'w-0 opacity-0'
                        }`}
                >
                    <ChatSearchUserSidebar />
                </div>
                <div className={`rounded-xl ring-1 transition-all duration-700 ease-in-out ring-gray-200 ${open ? 'w-3/5' : "w-4/5"
                    } p-3 tab:p-4`}>
                    <MainInbox chatRecord={chatData || CombinedChatData[0] as IChats} />
                </div>
            </div>
        </>
    )
}

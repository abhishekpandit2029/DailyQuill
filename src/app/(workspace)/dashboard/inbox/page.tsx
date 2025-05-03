"use client"

import ChatSearchUserSidebar from "@/components/Dashboard/ChatSearchUserSidebar"
import MainInbox from "@/components/Main/Chat/MainInbox"
import { useGetQuery } from "@/lib/fetcher"
import { defaultProfileImage } from "@/constants/strings"
import { pusherClient } from "@/helpers/getInitiatedPusher"
import { Splitter } from "antd"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { MdOutlinePersonSearch } from "react-icons/md"
import { Image } from 'antd';
import { formatTime } from "@/components/Main/Chat/Messages"

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

interface IChats {
    id: string;
    username: string;
    isOnline?: string
    fullName: string;
    picture: string | undefined;
    lastMessage: string | undefined;
    lastMessageTime: string | undefined | Date;
}

interface ChatFiltered {
    chats: Chat[]
}

interface OnlineUser {
    userId: string;
    isOnline: string;
}

export default function InboxPage() {
    const [open, setOpen] = useState<boolean>(false);
    const [chatData, setChatData] = useState<IChats | undefined>();
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

    const [{ userId }] = useCookies(["userId"]);
    const { data } = useGetQuery<ChatFiltered>(`/chat/user?userId=${userId}`);
    const [chats, setChats] = useState<Chat[]>(data?.chats || []);

    const PrimaryData: IChats[] = (chats?.map((item) => ({
        id: item?.senderId,
        username: item?.senderUsername,
        fullName: item?.senderFullName,
        picture: item?.senderPicture,
        lastMessage: item?.lastMessage,
        lastMessageTime: item?.lastMessageTime,
    })) || [])

    const SencondaryData: IChats[] = (chats?.map((item) => ({
        id: item?.receiverId,
        username: item?.receiverUsername,
        fullName: item?.receiverFullName,
        picture: item?.receiverPicture,
        lastMessage: item?.lastMessage,
        lastMessageTime: item?.lastMessageTime,
    })) || [])

    const CombinedChatData = [...PrimaryData, ...SencondaryData]?.filter((item) => item?.id !== userId)

    const handleClick = (values: IChats) => {
        setChatData(values);
    };

    const onlineMap = new Map(onlineUsers.map(user => [user.userId, user.isOnline]));

    const updatedUsers = CombinedChatData.map(user => ({
        ...user,
        isOnline: onlineMap.get(user.id) || "",
    }));

    useEffect(() => {
        pusherClient.subscribe(`online-user-collection`);

        pusherClient.bind("is-user-online", (userOnlineData: OnlineUser[]) => {
            setOnlineUsers([...userOnlineData])
        });

        return () => {
            pusherClient.unbind("is-user-online");
            pusherClient.unsubscribe(`online-user-collection`);
        };
    }, [userId]);

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
            <div className="bg-white pl-4 flex space-x-2 w-full h-[calc(100vh-4rem)] p-[0.1rem]">
                <div className="rounded-xl ring-1 w-2/6 ring-gray-200 lg:flex p-3 tab:p-4">
                    <Splitter layout="vertical">
                        <Splitter.Panel defaultSize="80%" min="20%" max="80%">
                            <div className="w-full flex flex-col space-y-4">
                                <div className="flex flex-row items-center justify-between">
                                    <p className="font-semibold text-2xl">Inbox</p>
                                    <MdOutlinePersonSearch className="text-2xl cursor-pointer" onClick={() => setOpen(!open)} />
                                </div>

                                <div className='flex flex-col space-y-3 w-full'>
                                    {
                                        updatedUsers?.map((item) => {
                                            return (
                                                <div
                                                    key={item?.id}
                                                    className="flex items-center cursor-pointer bg-white p-3 rounded-xl justify-between"
                                                    style={{ boxShadow: "rgba(149, 157, 165, 0.1) 0px 8px 24px" }}
                                                    onClick={() => handleClick(item)}
                                                >
                                                    <div className="flex space-x-3 items-center">
                                                        <div className="relative w-11 h-11">
                                                            <Image
                                                                src={item?.picture || defaultProfileImage}
                                                                alt="profile_img"
                                                                className="rounded-full min-w-11 min-h-11 object-cover"
                                                                preview={false}
                                                            />
                                                            {item?.isOnline?.includes("dashboard") && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>}
                                                        </div>
                                                        <div className="w-full">
                                                            <p className="text-[0.9rem]">{item?.fullName}</p>
                                                            <div className="flex justify-between items-center">
                                                                <p className="text-[0.8rem]">{item?.lastMessage || "Say hii!!"}</p>
                                                                <p className="text-[0.7rem]">{item?.lastMessageTime ? formatTime(item?.lastMessageTime as string) : ""}</p>
                                                            </div>
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
                    className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 w-2/6' : 'w-0 opacity-0'
                        }`}
                >
                    <ChatSearchUserSidebar />
                </div>
                <div className={`rounded-xl ring-1 transition-all duration-700 ease-in-out ring-gray-200 ${open ? 'w-4/6' : "w-4/6"
                    } p-3 tab:p-4`}>
                    <MainInbox chatRecord={chatData || updatedUsers[0] as IChats} />
                </div>
            </div>
        </>
    )
}

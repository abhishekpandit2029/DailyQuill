"use client";

import { defaultProfileImage } from "@/constants/strings";
import { pusherClient } from "@/helpers/getInitiatedPusher";
import { useGetQuery } from "@/lib/fetcher";
import clsx from "clsx";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";

interface MessagesProps {
  sessionId: string;
  chatId: string;
  sessionImg: string | null | undefined;
  chatPartner: any;
}

interface IMessageData {
  id: string
  text: string,
  timestamp: string,
  senderId: string,
}

interface IData {
  chats: {
    _id: string
    text: string,
    timestamp: string,
    senderId: string,
  }[]
}

const Messages: FC<MessagesProps> = ({
  sessionId,
  chatId,
  chatPartner,
  sessionImg,
}) => {

  // -------------- this is important for pub sub -------------------

  const { data } = useGetQuery<IData>(`/message/chat?senderId=${sessionId}&receiverId=${chatPartner?.id}`);

  const chatData = data?.chats?.map((item) => ({
    text: item?.text,
    timestamp: item?.timestamp,
    id: item?._id,
    senderId: item?.senderId,
  })) || [];

  const [messages, setMessages] = useState<IMessageData[]>(chatData || []);

  useEffect(() => {
    if (!sessionId || !chatId) return;

    pusherClient.subscribe(`message-collection`);

    pusherClient.bind("message-chat", (messageData: IMessageData) => {
      setMessages(prev => [
        ...prev,
        {
          id: messageData.id,
          text: messageData.text,
          timestamp: messageData.timestamp,
          senderId: messageData.senderId,
        }
      ]);
    });

    return () => {
      pusherClient.unbind("message-chat");
      pusherClient.unsubscribe(`message-collection`);
    };
  }, [sessionId, chatId]);

  useEffect(() => {
    if (chatData.length > 0) {
      setMessages(chatData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // -------------- this is important for pub sub -------------------

  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = parseInt(minutes.toString().padStart(2, '0'), 10);
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      ref={scrollDownRef}
    >

      {messages?.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())?.map((message, index) => {
        const isCurrentUser = message?.senderId === sessionId;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index]?.senderId;

        const isLastMessageFromSender =
          index === messages.length - 1 || messages[index + 1]?.senderId !== message.senderId;


        return (
          <div
            className="chat-message"
            key={`${message?.id}-${message?.timestamp}`}
          >
            <div
              className={clsx("flex items-end", {
                "justify-end": isCurrentUser,
              })}
            >
              <div
                className={clsx("relative w-6 h-6", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: !isLastMessageFromSender,

                })}
              >
                <Image
                  fill
                  src={
                    isCurrentUser ? (sessionImg as string) : chatPartner?.picture || defaultProfileImage
                  }
                  alt="Profile picture"
                  className="rounded-full"
                />
              </div>

              <div
                className={clsx(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  },
                )}
              >
                <span
                  className={clsx("px-4 py-2 rounded-lg inline-block", {
                    "bg-indigo-600 text-white": isCurrentUser,
                    "bg-gray-200 text-gray-900": !isCurrentUser,
                    "rounded-br-none":
                      !hasNextMessageFromSameUser && isCurrentUser,
                    "rounded-bl-none":
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message?.text}{" "}
                  <span className="ml-2 text-xs text-gray-400">
                    {formatTime(message?.timestamp)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;

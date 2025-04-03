"use client";

import { defaultProfileImage } from "@/constants/strings";
import { pusherClient } from "@/helpers/getInitiatedPusher";
import clsx from "clsx";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";

interface MessagesProps {
  initialMessages: any[];
  sessionId: string;
  chatId: string;
  sessionImg: string | null | undefined;
  chatPartner: any;
}

interface IMessageData {
  _id: string
  text: string,
  timestamp: string,
  senderId: string,
}

const Messages: FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  chatId,
  chatPartner,
  sessionImg,
}) => {
  const [messages, setMessages] = useState<any[]>(initialMessages);

  useEffect(() => {
    if (!sessionId || !chatId) return;

    const channelName = `message-collection`;
    pusherClient.subscribe(channelName);

    const handleNewMessage = (messageData: IMessageData) => {
      setMessages((prev) => [...prev, messageData]);
    };

    pusherClient.bind("message-chat", handleNewMessage);

    return () => {
      pusherClient.unbind("message-chat", handleNewMessage);
      pusherClient.unsubscribe(channelName);
    };
  }, [sessionId, chatId]);


  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12-hour format
    minutes = parseInt(minutes.toString().padStart(2, '0'), 10); // Ensure two-digit minutes
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef} />

      {initialMessages?.map((message, index) => {
        const isCurrentUser = message?.senderId === sessionId;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index]?.senderId;

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

              <div
                className={clsx("relative w-6 h-6", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <Image
                  fill
                  src={
                    isCurrentUser ? (sessionImg as string) : chatPartner?.picture || defaultProfileImage
                  }
                  alt="Profile picture"
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;

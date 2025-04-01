import { connect } from "@/dbConfig/dbConfig";
import { pusherServer } from "@/helpers/getInitiatedPusher";
import Chat from "@/models/chatModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connect();

    try {
        const { sender, receiver } = await req.json();

        if (!sender || !receiver) {
            return NextResponse.json({ error: "User IDs are required" }, { status: 400 });
        }

        // Check if chat already exists
        let chat = await Chat.findOne({ participants: { $all: [sender, receiver] } });

        if (!chat) {
            const chatId = `${sender}-${receiver}`;

            const receiverUser = await User.findById(receiver);
            const senderUser = await User.findById(sender);

            if (!receiverUser || !senderUser) {
                return NextResponse.json({ error: "User(s) not found" }, { status: 404 });
            }

            // Create a new chat
            chat = new Chat({
                chatId,
                participants: [sender, receiver],

                receiverId: receiverUser._id,
                receiverUsername: receiverUser.username,
                receiverFullName: receiverUser.full_name,
                receiverPicture: receiverUser.userprofile_image,

                senderId: senderUser._id,
                senderUsername: senderUser.username,
                senderFullName: senderUser.full_name,
                senderPicture: senderUser.userprofile_image,
            });
            await chat.save();

            await pusherServer.trigger(`chat-collection`, "new-chat", {
                chatId,
                participants: [sender, receiver],

                receiverId: receiverUser._id,
                receiverUsername: receiverUser.username,
                receiverFullName: receiverUser.full_name,
                receiverPicture: receiverUser.userprofile_image,

                senderId: senderUser._id,
                senderUsername: senderUser.username,
                senderFullName: senderUser.full_name,
                senderPicture: senderUser.userprofile_image,
            });
        }

        return NextResponse.json({ success: true, chat }, { status: 200 });
    } catch (error) {
        console.error("Error creating chat:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

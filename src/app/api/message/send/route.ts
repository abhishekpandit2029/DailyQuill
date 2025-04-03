import { connect } from "@/dbConfig/dbConfig";
import Message from "@/models/messagesModel";
import Chat from "@/models/chatModel";
import { NextRequest } from "next/server";
import { pusherServer } from "@/helpers/getInitiatedPusher";

connect();

export async function POST(req: NextRequest) {
    try {
        const { chatId, senderId, receiverId, text, participants } = await req.json();

        if (!chatId || !senderId || !text || !receiverId || !Array.isArray(participants)) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const message = new Message({ chatId, senderId, text, receiverId, participants });
        await message.save();

        await pusherServer.trigger(`message-collection`, "message-chat", {
            text: message?.text,
            timestamp: message?.timestamp,
            id: message?.id,
            senderId: message?.senderId,
        });

        // Update chat lastMessage
        await Chat.findOneAndUpdate(
            { participants: { $all: [senderId, receiverId] } },
            { lastMessage: text, lastMessageTime: Date.now() }
        );

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
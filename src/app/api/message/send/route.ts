import { connect } from "@/dbConfig/dbConfig";
import Message from "@/models/messagesModel";
import Chat from "@/models/chatModel";
import { NextRequest } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const { chatId, senderId, text, media } = await req.json();

        if (!chatId || !senderId || !text) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Create and save message
        const message = new Message({ chatId, senderId, text, media });
        await message.save();

        // Update chat lastMessage
        await Chat.findByIdAndUpdate(chatId, { lastMessage: text, lastMessageTime: Date.now() });

        return Response.json({ success: true, message }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}

import { connect } from "@/dbConfig/dbConfig";
import Message from "@/models/messagesModel";
import { NextRequest } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const senderId = searchParams.get("senderId");
        const receiverId = searchParams.get("receiverId");

        if (!receiverId || !senderId) {
            return Response.json({ error: "Chat ID is required" }, { status: 400 });
        }

        const chats = await Message.find({ participants: { $all: [senderId, receiverId] } })
            .sort({ lastMessageTime: -1 });

        return Response.json({ success: true, chats }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}

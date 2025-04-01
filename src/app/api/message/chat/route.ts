import { connect } from "@/dbConfig/dbConfig";
import Message from "@/models/messagesModel";
import { NextRequest } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const chatId = searchParams.get("chatId");

        if (!chatId) {
            return Response.json({ error: "Chat ID is required" }, { status: 400 });
        }

        // Find all messages in the chat
        const messages = await Message.find({ chatId }).sort({ timestamp: 1 });

        return Response.json({ success: true, messages }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}

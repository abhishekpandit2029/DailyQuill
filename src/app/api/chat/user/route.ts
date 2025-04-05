import { connect } from "@/dbConfig/dbConfig";
import Chat from "@/models/chatModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const chats = await Chat.find({ participants: userId })
            .sort({ lastMessageTime: -1 });

        return NextResponse.json({ success: true, chats: chats }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

import { connect } from "@/dbConfig/dbConfig";
import Message from "@/models/messagesModel";

connect();

export async function GET({ params }: { params: { chatId: string } }) {
    try {
        const { chatId } = params;

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

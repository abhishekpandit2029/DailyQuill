import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        chatId: { type: String, required: true, unique: true }, // Unique chat identifier (e.g., "user123-user456")
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], // Users in the chat
        lastMessage: { type: String, default: "" }, // Stores the last message text
        lastMessageTime: { type: Date, default: Date.now }, // Timestamp of the last message

        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        receiverUsername: { type: String, required: true },
        receiverFullName: { type: String, required: true },
        receiverPicture: { type: String, required: false, },

        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        senderUsername: { type: String, required: true },
        senderFullName: { type: String, required: true },
        senderPicture: { type: String, required: false }
    },
    { collection: "chat", timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        chatId: { type: String, required: true }, // Chat reference
        senderId: { type: String, required: true }, // Sender's user ID
        receiverId: { type: String, required: true }, // Receiver's user ID
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], // Users in the chat

        text: { type: String, default: "" }, // Message content
        timestamp: { type: Date, default: Date.now } // Message timestamp
    },
    { collection: "message", timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;

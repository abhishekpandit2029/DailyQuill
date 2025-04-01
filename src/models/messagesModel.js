import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true }, // Chat reference
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Sender's user ID
        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Receiver's user ID
        text: { type: String, default: "" }, // Message content
        timestamp: { type: Date, default: Date.now } // Message timestamp
    },
    { collection: "message", timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;

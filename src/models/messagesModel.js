import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true }, // Chat reference
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Sender's user ID
        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Receiver's user ID
        text: { type: String, default: "" }, // Message content
        media: {
            type: {
                type: String, // "image", "video", "audio", "file", etc.
                enum: ["image", "video", "audio", "file"],
                default: null
            },
            url: { type: String, default: null } // Media file URL
        },
        replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null }, // Reference to another message if replying
        reactions: { type: Map, of: [String], default: {} }, // Stores emoji reactions (e.g., {"❤️": ["user123", "user456"]})
        status: {
            type: String,
            enum: ["sent", "delivered", "read"],
            default: "sent"
        },
        timestamp: { type: Date, default: Date.now } // Message timestamp
    },
    { collection: "message", timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;

import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        senderId: {
            type: String
        },
        senderName: {
            type: String,
        },
        isAdmin: {
            type: Boolean
        },
    },
    {timestamps: true}
)

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema)
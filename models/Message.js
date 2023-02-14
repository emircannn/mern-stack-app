import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            required: true,    
        },
        sender: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
)

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)
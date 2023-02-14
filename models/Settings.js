import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
    {
        work : {
            type: Boolean,
            default: true,
        },
        clock: {
            type: String,
            default: "09.00-19.30"
        },
        day: {
            type: String,
            default: "Hergün"
        },
        minwage: {
            type: Number,
            default: 40
        },
    }
)

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema)
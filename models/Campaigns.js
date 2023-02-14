import mongoose from "mongoose";

const CampaignsSchema = new mongoose.Schema(
    {
        img : {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

export default mongoose.models.Campaigns || mongoose.model("Campaigns", CampaignsSchema)
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        title : {
            type: String,
            maxlength: 60,
            required: true
        }
    },
    {timestamps: true}
)

export default mongoose.models.Category || mongoose.model("Category", CategorySchema)
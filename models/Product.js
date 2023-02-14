import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            maxlength: 60,
            required: true
        },
        desc: {
            type: String,
            maxlength: 200,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
        },
        isActive: {
            type: Boolean,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        /* extraOptions: {
            type: [
                {
                    text: {type: String},
                },
            ]
        } */
    },
    {timestamps: true}
)

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)
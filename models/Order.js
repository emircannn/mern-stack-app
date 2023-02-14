import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customer: {
            type: String,
            required: true,
        },
        products: {
            type: [
                {
                    type: Object,
                    required: true,
                },
            ]
        },
        address : {
            type : String,
            required: true
        },
        phone : {
            type: Number,
            required: true
        },
        total : {
            type : Number,
            required: true
        },
        status : {
            type : Number,
            required: true
        },
        method : {
            type : Number,
            required: true
        },
        message : {
            type : String,
        },

    },
    {timestamps: true}
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
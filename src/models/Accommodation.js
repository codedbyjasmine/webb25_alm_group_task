import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema(
    {
        address: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },  
        country: { type: String, required: true },
        rentalPrice: { type: Number, required: true, min: 0 },
        rooms: { type: Number, required: true, min: 1 },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Accommodation", accommodationSchema);
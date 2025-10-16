import mongoose from "mongoose";

const iconSchema = new mongoose.Schema({
    "name": { type: String, required: true, trim: true },
    "svg": { type: String, required: true },
    "category": { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
});

export const Icon = mongoose.model("Icon", iconSchema);



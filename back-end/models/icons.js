import mongoose from "mongoose";

const iconSchema = new mongoose.Schema({
    "name": { type: String, required: true, trim: true },
    "svg": { type: String, required: true },
    "category": { type: String, ref: "Category", required: true },
    'tags': { type: [String], required: true, default: [] },
});

export const Icon = mongoose.model("Icon", iconSchema);



import mongoose from "mongoose";

const iconSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    svg: { type: String, required: true },
    tags: { type: [String], required: true }
});

export const Icon = mongoose.model("Icon", iconSchema);



import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        assigner: { type: Schema.Types.ObjectId, ref: "User", required: true },
        receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: ["pending", "inProgress", "completed", "approved"], default: "pending" },
        remark: { type: String }
    },
    { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema); 
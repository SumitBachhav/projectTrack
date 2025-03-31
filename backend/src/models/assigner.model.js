import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    assigner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "inProgress", "completed", "approved"],
      default: "pending",
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
    completedAt: {
      type: Date,
    },
    
    remark: {
      type: String,
      trim: true,
    },
    previousAssignments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        reassignedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    comments: [
      {
        content: {
          type: String,
          required: [true, "Comment  required"],
          trim: true,
        },
        commentedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
        },
      },
    ],
  },

  { timestamps: true }  
);

export const Task = mongoose.model("Task", taskSchema);

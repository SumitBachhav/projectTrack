import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Abstract",
        required: true
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: "Abstract",
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }],
    guide: {
        type: Schema.Types.ObjectId,
        ref: "Staff"
    },
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: "Staff"
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }],
    status: {
        type: String,
        enum: ['inProgress', 'completed'],
        default: 'pending'
    },
},
    {
        timestamps: true
    });

export const Group = mongoose.model("Group", groupSchema)

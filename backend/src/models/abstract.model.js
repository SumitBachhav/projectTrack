import mongoose, { Schema } from "mongoose";

const abstractSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    abstract: {
        type: String,
        required: true,
    },
    abstract_e: {
        type: String,
        required: true,
    },
    domain: [
        {
            type: String,
            required: true,
        }
    ],
    keywords: [
        {
            type: String,
            required: true,
        }
    ],
    requirements: [{
        domain: {
            type: String,
        },
        skills: [{
            type: String
        }]
    }],
    matched: [{
        score: {
            type: Number,
        },
        abstractId: {
            type: Schema.Types.ObjectId,
            ref: "Abstract",
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'submitted', 'revision', 'accepted', 'rejected', 'completed'],
        default: 'pending'
    },
    assignedTo: [{
        assignedStaff: {
            type: Schema.Types.ObjectId,
            ref: "Staff",
            required: true
        },
        decision: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'revision'],
            default: 'pending'
        },
        comments: {
            old: [{
                type: String
            }],
            new: [{
                type: String
            }]
        }
    }]
},
    {
        timestamps: true
    });

export const Abstract = mongoose.model("Abstract", abstractSchema)

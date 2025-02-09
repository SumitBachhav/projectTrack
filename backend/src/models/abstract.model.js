import mongoose, { Schema } from "mongoose";

const abstractSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "Student"
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
    //TODO: check if this is correct ref vid - 6 at 25 min
    // scores: [{
    //     type: String,
    // }],
    // matchedIds: [{
    //     type: String,
    // }],
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
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending'
    },
},
    {
        timestamps: true
    });

export const Abstract = mongoose.model("Abstract", abstractSchema)

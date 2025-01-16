import mongoose, { Schema } from "mongoose";

const abstractSchema = new Schema({
    userID: {
        // type: Schema.Types.ObjectId,
        // ref: "User"
        type: String
    },
    title: {
        type: String,
        required: true,
    },
    abstract: {
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
    // status: {
    //     type: String,
    //     enum: ["pending", "accepted", "rejected"],
    //     default: "pending"
    // },
    score1: {
        type: String,
        required: true,
    },
    score2: {
        type: String,
        required: true,
    },
    score3: {
        type: String,
        required: true,
    },
    matchedId1: {
        type: String,
        required: true,
    },
    matchedId2: {
        type: String,
        required: true,
    },
    matchedId3: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    });

export const Abstract = mongoose.model("Abstract", abstractSchema)

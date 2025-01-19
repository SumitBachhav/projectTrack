import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    domain: {
        type: String,
        required: true
    },
    skills: [{
        type: String,
        required: true
    }],
    experience: {
        type: Number
    },
},
    {
        timestamps: true
    });

export const Skill = mongoose.model("Skill", skillSchema)

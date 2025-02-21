import mongoose, { Schema } from "mongoose";

const staffSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userID: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    department: {
        type: String,
        enum: ['computer', 'civil', 'mechanical', 'electrical', 'it'],
    },
    googleScholar: {
        type: String
    },
    expertiseDomain: [{
        domain: {
            type: String,
            required: true
        },
        experience: {
            type: Number,
            required: true
        }
    }],
    groups: [{
        type: Schema.Types.ObjectId,
        ref: "Group"
    }],
    verificationAssigned: [{
        type: Schema.Types.ObjectId,
        ref: "Abstract"
    }]

},
    {
        timestamps: true
    });

export const Staff = mongoose.model("Staff", staffSchema)

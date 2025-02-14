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
    expertiseDomain: [{
        type: String,
        required: true
    }],
    groups: [{
        type: Schema.Types.ObjectId,
        ref: "Group"
    }],
    verificationAssigned: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }]

},
    {
        timestamps: true
    });

export const Staff = mongoose.model("Staff", staffSchema)

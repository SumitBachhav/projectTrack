import mongoose, { Schema } from "mongoose";

const staffSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    department: {
        type: String,
        enum: ['computer', 'civil', 'mechanical', 'electrical', 'it'],
    },
    expertise: [{
        type: Schema.Types.ObjectId,
        ref: "Skill"
    }],
    otherSkills: [{
        type: Schema.Types.ObjectId,
        ref: "Skill"
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

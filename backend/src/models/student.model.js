import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
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
    year: {
        type: Number,
        required: true
    },
    division: {
        type: String,
    },
    department: {
        type: String,
        enum: ['computer', 'civil', 'mechanical', 'electrical', 'it'],
        required: true
    },
    skills: [{
        type: Schema.Types.ObjectId,
        ref: "Skill"
    }],
    certificates: [{
        // type: Schema.Types.ObjectId,
        // ref: "Certificates"
        // TODO: add certificate schema
        type: String
    }],
    github: {
      type: String,
      required: true  
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    },
    submittedAbstracts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Abstract"
        }
    ],
    acceptedByStaffAbstracts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Abstract"
        }
    ],
    finalizedAbstract: 
        {
            type: Schema.Types.ObjectId,
            ref: "Abstract"
        }
    ,
    donatedAbstracts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Abstract"
        }
    ],
},
    {
        timestamps: true
    });

export const Student = mongoose.model("Student", studentSchema)

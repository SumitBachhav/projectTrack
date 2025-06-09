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
    employedInInstitution: {
      type: Boolean,
      required: true  
    },
    availability: {
        type: Boolean,
        required: true
    },
    department: {
        type: String,
        enum: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Computer Engineering', 'Information Technology', 'Electronics and Telecommunication Engineering', 'Artificial Intelligence and Data Science'],
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
        abstract: {
            type: Schema.Types.ObjectId,
            ref: "Abstract",
            required: true
        },
        status: {
            type: String,
            enum: ['accepted', 'rejected', 'revision'],
            default: 'revision'
        }
    }]

},
    {
        timestamps: true
    });

export const Staff = mongoose.model("Staff", staffSchema)

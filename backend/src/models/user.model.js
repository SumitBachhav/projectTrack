import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    password: {
        type: String,
        // required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['student', 'staff', 'coordinator'],
        required: true,
    },
    userID: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
},
    {
        timestamps: true
    });

export const User = mongoose.model("User", userSchema)

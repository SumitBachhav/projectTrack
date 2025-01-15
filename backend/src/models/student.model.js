import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},
    {
        timestamps: true
    });

export const Student = mongoose.model("Student", studentSchema)

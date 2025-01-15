import mongoose, { Schema } from "mongoose";

const staffSchema = new Schema({
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

export const Staff = mongoose.model("Staff", staffSchema)

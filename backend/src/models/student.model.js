import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
    name: {
        // type: Schema.Types.ObjectId,
        // ref: "User"
        type: String
    },
    userID: {
        // type: Schema.Types.ObjectId,
        // ref: "User"
        type: String
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
    ]
},
    {
        timestamps: true
    });

export const Student = mongoose.model("Student", studentSchema)

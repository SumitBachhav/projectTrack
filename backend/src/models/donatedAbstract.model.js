import mongoose, { Schema } from "mongoose";

const donatedAbstractSchema = new Schema({
    abstract: {
        type: Schema.Types.ObjectId,
        ref: "Abstract",
        required: true
    },
    InUse: {
        type: Boolean,
        default: false
    },
    acceptedBy: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },



},
{
    timestamps: true
});

export const DonatedAbstract = mongoose.model("DonatedAbstract", donatedAbstractSchema);
    // donor: {
    //     type: Schema.Types.ObjectId,
    //     refPath: 'donorModel',
    //     required: true
    // },
    // donorModel: {
    //     type: String,
    //     required: true,
    //     enum: ['Student', 'Staff']  // Dynamic reference
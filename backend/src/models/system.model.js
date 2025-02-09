import mongoose, { Schema } from "mongoose";

const systemDataSchema = new Schema({
    effectiveYear: {
        type: Number,
        required: true  
    },
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

export const SystemData = mongoose.model("SystemData", systemDataSchema)

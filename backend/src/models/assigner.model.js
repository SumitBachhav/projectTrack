import mongoose, {Schema} from "mongoose";

const assignerSchema = new Schema({
    id: {
        type: String,
        required: true
    },

    isAssign: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: false
    },

    isEditTask: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: false
    },

    isReAssign: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: false
    },

    isDeleteAssign: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: false
    },

    previousUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ]
    
});
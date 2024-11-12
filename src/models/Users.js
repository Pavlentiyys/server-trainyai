import mongoose, { Schema } from "mongoose";

const UsersSchema = new mongoose.Schema({
    firstname: { 
        type: String, 
        required: true, 
    },
    lastname: { 
        type: String, 
        required: true, 
    },
    age: { 
        type: Number, 
        required: true, 
    },
    avatar: { 
        type: String, 
        required: false, 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
    },
    password: { 
        type: String, 
        required: true, 
    },
    completedCourses: [{
        course: { 
            type: Schema.Types.ObjectId, 
            ref: "courses"
        },
        completedAt: {
            type: Date,
            dafault: Date.now
        }
    }],
    registerAt: { 
        type: Date, 
        default: Date.now, 
    },
});

export const UsersModel = mongoose.model("users", UsersSchema);
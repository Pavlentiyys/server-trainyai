import mongoose, { Schema } from "mongoose";

const CoursesSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image: { type: 
        String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    },
    lessons: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'lessons' 
    }],
});

export const CoursesModel = mongoose.model("courses", CoursesSchema);
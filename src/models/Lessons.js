import mongoose, { Schema } from "mongoose";

const LessonsSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
        required: true, 
    },
    image: { 
        type: String, 
        required: true 
    },
    video: { 
        type: String, 
        required: true 
    },
    test: {
        type: Schema.Types.ObjectId,
        ref: "tests"
    },
    comments: [{
        author: { 
            type: Schema.Types.ObjectId, 
            ref: "users"
        },
        text: { 
            type: String, 
            required: false 
        },
    }],
});

export const LessonsModel = new mongoose.model("lessons", LessonsSchema);
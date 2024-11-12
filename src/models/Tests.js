import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    variants: [{
        variant: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            default: false
        }
    }]
});

export const TestsModel = new mongoose.model("tests", TestSchema)

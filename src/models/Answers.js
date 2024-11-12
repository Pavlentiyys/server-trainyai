import mongoose, { Schema } from "mongoose";

const AnswerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    test: {
        type: Schema.Types.ObjectId,
        ref: "tests"
    }
});

export const AnswersModel = new mongoose.model("answer", AnswerSchema);
import { LessonsModel } from "../models/Lessons";
import { TestsModel } from "../models/Tests";

export const testById = async (req, res) => {
    try {
        const lessonId = req.params.lessonId
        const test = await TestsModel.findById(lessonId);
        res.status(200).json(test);
    } catch (err) {
        res.status(500).json({ err: "Internal server error" });
    }
}

export const testSave = async (req, res) => {
    try {
        const lessonId = req.params.lessonId
        const { question, variants } = req.body;

        if (!question || !Array.isArray(variants)) {
            return res.status(400).json({ err: "Invalid date" });
        }

        const newTest = new TestsModel(question, variants)

        await LessonsModel.findByIdAndUpdate(
            lessonId,
            { $push: { tests: newTest._id }},
            { new: true }
        ).populate("tests");

        if (!newTest) {
            return res.status(404).json( { err: "Test is not found" } )
        }
        res.status(200).json( { message: "Test is created"} )
    } catch (err) {
        res.status(500).json( { err: "Internal server error" } )
    }
};

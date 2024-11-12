import { LessonsModel } from "../models/Lessons.js";
import { CoursesModel } from "../models/Courses.js"

export const lessonById = async (req, res) => {
    try { 
        const courseId = req.params.courseId
        
        const lesson = await LessonsModel.findById(courseId);
        if (!lesson) {
            return res.status(404).json({ err: "Lesson is not found" });
        }
        res.status(200).json(lesson);
    } catch (err) {
        res.status(500).json({ err: "internal server error" });
    }
};

export const lessonSave = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { title, description } = req.body;

        const imageUrl = req.files["image"] ? req.files["images"].map(file => file.filename) : [];
        const videoUrl = req.files["video"] ? req.files["video"][0].filename : null;

        const newLesson = new LessonsModel({
            title,
            description, 
            video: videoUrl, 
            image: imageUrl
        });
        await newLesson.save();

        const updatedCourse = await CoursesModel.findByIdAndUpdate(
            courseId,
            { $push: { lessons: newLesson._id } },
            { new: true }
        ).populate("lessons");

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found"});
        }
        res.status(200).json({ message: "Lesson is created "})
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};


import { CoursesModel } from "../models/Courses.js";

export const courses = async (req, res) => {
    try {
        const Courses = await CoursesModel.findAll();
        res.status(200).json(Courses);
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" });
    }
};

export const courseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await CoursesModel.findById(courseId).populate("lessons")
        if (course) {
            return res.status(200).json(course);
        }
        res.status(404).json({ err: "Course not found" });
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" });
    }
};

export const courseSave = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const imageUrl = req.file;
        
        if (!title || !description) {
            return res.status(400).json({ error: "Title, description are required" });
        }
        const NewCourse = new CoursesModel({ title, description, image: imageUrl.filename, price});
        await NewCourse.save();
        
        res.status(201).json(" Course is created success");
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" });
    }
};

export const changeStatus = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { status } = req.body;

        const updatedCourse = await CoursesModel.findByIdAndUpdate(courseId, { status }, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ err: "Course not found" });
        }
        res.status(200).json({ message: "Status is changed "});
        
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" });
    }
};

export const courseUpdate = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { title, description, price, status } = req.body;
        const imageUrl = req.file;

        const currentCourse = await CoursesModel.findById(courseId);

        const updatedCourse = await CoursesModel.findByIdAndUpdate(courseId, {
            title, description, price, status, image: imageUrl ? imageUrl.filename : currentCourse.imageUrl
        }, { new: true})

        if (!updatedCourse) {
            return res.status(404).json({ err: "Course not found"})
        }

        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" });
    }
};




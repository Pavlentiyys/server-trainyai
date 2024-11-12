import express from "express";
import { changeStatus, courseById, courses, courseSave, courseUpdate } from "../controllers/Courses-controllers.js"
import { uploadImage } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", courses);
router.post("/", uploadImage, courseSave);
router.get("/:courseId", courseById);
router.post("/:courdeId", uploadImage, courseUpdate);
router.post("/status/:courseId", changeStatus);

export { router as coursesRouter}
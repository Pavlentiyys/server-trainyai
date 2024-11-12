import express from "express";
import { lessonById, lessonSave } from "../controllers/Lessons-controllers.js";
import { uploadMedia} from "../middlewares/upload.js";

const router = express.Router();

router.post("/course/:courseId", uploadMedia, lessonSave);
router.get("/course/:courseId", lessonById);

export { router as lessonRouter }
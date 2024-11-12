import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import { dirname } from "./src/middlewares/upload.js";

import { userRouter } from "./src/routes/Users-routes.js"
import { coursesRouter } from "./src/routes/Courses-routes.js";
import { lessonRouter } from "./src/routes/Lessons-route.js";

const app = express();
dotenv.config();

app.use(cors(), express.json());
app.use("/images", express.static(path.join(dirname, "uploads")))

app.use("/api/user", userRouter);
app.use("/api/course", coursesRouter);
app.use("/api/lesson", lessonRouter);

mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
import express from "express";
import { login, profile, register } from "../controllers/Users-controllers.js";
import { uploadImage } from "../middlewares/upload.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();


router.post("/auth/register", uploadImage, register);
router.post("/auth/login", login);

router.get("/profile", auth, profile);

export { router as userRouter }
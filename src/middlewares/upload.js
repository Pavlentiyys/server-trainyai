import multer from "multer";
import path from "path"
import { fileURLToPath } from "url";

export const dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/images");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
}).single("image");

export const uploadMedia = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "image") {
                cb(null, "uploads/images");
            } else if (file.fieldname === "video") {
                cb(null, "uploads/videos");
            } else {
                cb(new Error("Unexpected field"), false);
            }
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
}).fields([
    { name: "images", maxCount: 1},
    { name: "video", maxCount: 1}
]);


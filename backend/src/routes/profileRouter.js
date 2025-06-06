import e from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerConfig.js";

const profileRoutes = e.Router();

profileRoutes.get("/:username", getProfile);
profileRoutes.put("/:id", authMiddleware, upload.single("profile_picture"), updateProfile);

export default profileRoutes;

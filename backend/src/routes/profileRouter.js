import e from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerConfig.js";

const profileRoutes = e.Router();

router.get("/:username", getProfile);
router.put("/:id", authMiddleware, upload.single("profile_picture"), updateProfile);

export default profileRoutes;

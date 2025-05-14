import e from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addPost, editPost, fetchPost, listPosts, removePost } from "../controllers/postController.js";

const postRoutes = e.Router();

postRoutes.get("/", listPosts);
postRoutes.get("/:id", fetchPost);

postRoutes.post("/", authMiddleware, addPost);
postRoutes.put("/:id", authMiddleware, editPost);
postRoutes.delete("/:id", authMiddleware, removePost);

export default postRoutes;

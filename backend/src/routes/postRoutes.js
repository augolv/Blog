import e from "express";
import jwt from "jsonwebtoken";
import { addPost, editPost, fetchPost, listPosts, removePost } from "../controllers/postController.js";

const postRoutes = e.Router();

const validateJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ error: "Invalid or exprired token" });
    }

    req.user = decoded;
    next();
  });
};

postRoutes.get("/", listPosts);
postRoutes.get("/:id", fetchPost);

postRoutes.post("/", validateJWT, addPost);
postRoutes.put("/:id", validateJWT, editPost);
postRoutes.delete("/:id", validateJWT, removePost);

export default postRoutes;

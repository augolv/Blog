import e from "express";
import { login, register } from "../controllers/authController.js";

const authRoutes = e.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

export default authRoutes;

import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = Router();

// Route to register a new user
router.route("/register").post(registerUser);

export default router;

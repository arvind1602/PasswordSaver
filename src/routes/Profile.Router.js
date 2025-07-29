// ✅ Profile.Router.js
import { Router } from "express";
import verifyToken from "../middlewares/auth.middlewares.js";
import UserProfile from "../controllers/Profile.controller.js";

const router = Router();

router.get("/profile", verifyToken, UserProfile);

export default router;

import { PassShowController } from "../controllers/Pass.Show.controller.js";
import { Router } from "express";
import verifyToken from "../middlewares/auth.middlewares.js";

const router = Router();

router
  .route("/user-passwords")
  .get(verifyToken, PassShowController.getUserPasswords);

export default router;

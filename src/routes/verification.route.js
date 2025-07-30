import { Router } from "express";
import {
  sendCode,
  verifyCode,
} from "../controllers/Verification.controller.js";

const router = Router();

router.route("/send-code").post(sendCode);
router.route("/verify-code").post(verifyCode);

export default router;

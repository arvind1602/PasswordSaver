import {
  addPasswordEntry,
  deletePasswordEntry,
  updatePassword
} from "../controllers/Passwords.controller.js";
import { Router } from "express";
import verifyToken from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/").get((req, res) => {
  res.status(200).send("Passwords route is working");
});
router.route("/add").post(verifyToken, addPasswordEntry);
router.route("/update-password/:id").put(verifyToken , updatePassword)
router.route("/delete/:id").delete(verifyToken, deletePasswordEntry);

export default router;

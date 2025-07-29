import { Router } from "express";
import {
  CreateUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  verifyUser,
  updateUsername,
  changePassword,
  deleteAccount,
} from "../controllers/User.Controller.js";
import verifyToken from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "User route is working" });
});

router.route("/create").post(CreateUser);
router.route("/login").post(loginUser);
router.route("/verify").post(verifyToken, verifyUser);
router.route("/logout").post(verifyToken, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

router.put("/update-username/", verifyToken, updateUsername);
router.put("/change-password", verifyToken, changePassword);
router.delete("/delete-account", verifyToken, deleteAccount);

export default router;

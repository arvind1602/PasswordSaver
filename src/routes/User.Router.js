import  {Router} from "express";
import { CreateUser , loginUser , logoutUser , refreshAccessToken} from "../controllers/User.Controller.js";
import verifyToken from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get((req, res) => {
  res.status(200).send("User route is working");
});


router.route("/create").post(CreateUser);
router.route("/login").post(loginUser);
router.route("/logout").post( verifyToken, logoutUser);
router.route("/refresh-token").post( refreshAccessToken);



export default router;
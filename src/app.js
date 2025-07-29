import express from "express";
import UserRouter from "./routes/User.Router.js";
import PasswordRouter from "./routes/Passwords.Route.js";
import  ProfileRouter  from "./routes/Profile.Router.js"
import PasswordShowRouter from "./routes/Pass.show.Router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/users", UserRouter);
app.use("/api/passwords", PasswordRouter);
app.use("/api/passwords/show", PasswordShowRouter);
app.use("/api/user" , ProfileRouter)

export default app;

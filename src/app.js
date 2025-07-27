import express from "express";
import UserRouter from "./routes/User.Router.js";
import PasswordRouter from "./routes/Passwords.Route.js";
import PasswordShowRouter from "./routes/Pass.show.Router.js";
import cookieParser from "cookie-parser";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", UserRouter);
app.use("/api/passwords", PasswordRouter);
app.use("/api/passwords/show", PasswordShowRouter);


export default app;



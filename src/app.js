import express from "express";
import router from "./routes/User.Router.js";
import cookieParser from "cookie-parser";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", router);


export default app;



import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/db.connection.js";
import app from "./app.js";

connectDB()
  .then(() => {
    console.log(`⚙️ MongoDB connected successfully!\n`);
    app.listen(process.env.PORT , () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection failed: ", err);
  });

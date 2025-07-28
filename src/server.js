import dotenv from "dotenv";
import connectDB from "./db/db.connection.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    console.log(`⚙️ MongoDB connected successfully!\n`);
    app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection failed: ", err);
  });

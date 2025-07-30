
import dotenv from "dotenv";
dotenv.config({ path: './.env' })
import connectDB from "./db/db.connection.js";
import app from "./app.js";



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
console.log(process.env.ACCESS_TOKEN_SECRET);
console.log(process.env.CORS_ORIGIN);

import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}${process.env.DATABASE_NAME}`
    );
    console.log(`\n MongoDB connected !! \n `);
  } catch (error) {
    console.log("MONGODB connection FAILED !....", error);
  }
};

export default connectDB;

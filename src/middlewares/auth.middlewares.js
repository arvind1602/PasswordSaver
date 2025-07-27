import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.Model.js";

const verifyToken = async(req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError("Access token is required", 401);
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded?.id).select("-password -refresh_token");
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "An error occurred while verifying token",
    });
  }
};

export default verifyToken;

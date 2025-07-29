import User from "../models/User.Model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generatetoken = async (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refresh_token = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
};

const CreateUser = async (req, res) => {
  try {
    const { username, email, fullname, password } = req.body;

    // Check if any field is missing
    if (!username || !email || !fullname || !password) {
      throw new ApiError("All fields are required", 400);
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new ApiError("Username already exists", 400);
    }

    const newUser = await User.create({ username, email, fullname, password });
    // Remove sensitive fields before sending response
    const userObj = newUser.toObject();
    delete userObj.password;
    delete userObj.refresh_token;

    res
      .status(201)
      .json(new ApiResponse(userObj, "User created successfully", 201));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "An error occurred while creating user",
    });
  }
};

const loginUser = async (req, res) => {
  // Implementation for user login
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json(new ApiResponse(null, "all field are required", 200));
  }
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const ispasswordMatch = await user.isPasswordValid(password);
    if (!ispasswordMatch) {
      throw new ApiError("Invalid password", 401);
    }
    const { accessToken, refreshToken } = await generatetoken(user);

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refresh_token;

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .status(200)
      .json(new ApiResponse(userObj, "Login successful", 200));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "An error occurred while logging in" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError("User not found", 400);
    }
    user.refresh_token = null;
    await user.save();
    res
      .clearCookie("refreshToken")
      .clearCookie("accessToken")
      .status(200)
      .json(new ApiResponse(null, "Logout successful", 200));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "An error occurred while logging out",
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];
    if (!refreshToken) {
      throw new ApiError("Refresh token is required", 401);
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select(
      "-password -refresh_token"
    );
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generatetoken(user);
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res
      .cookie("refreshToken", newRefreshToken, options)
      .cookie("accessToken", accessToken, options)
      .status(200)
      .json(new ApiResponse(null, "Access token refreshed successfully", 200));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message:
        error.message || "An error occurred while refreshing access token",
    });
  }
};
const verifyUser = async (req, res) => {
  try {
    const user = req.user; // Already added by middleware
    if (!user || !user._id) {
      throw new ApiError("Access token not verified", 401);
    }

    res.status(200).json(new ApiResponse(user, "Success", 200));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Verification failed",
    });
  }
};
const updateUsername = async (req, res) => {
  const user = req.user;
  user.username = req.body.username;
  await user.save();
  res.json({ message: "Username updated successfully" });
};

const changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new ApiError("Old and new passwords are required", 400);
    }

    const isMatch = await user.isPasswordValid(oldPassword);
    if (!isMatch) {
      throw new ApiError("Old password is incorrect", 401);
    }

    user.password = newPassword; // This will be hashed by pre-save hook
    await user.save();

    res
      .status(200)
      .json(new ApiResponse(null, "✅ Password changed successfully", 200));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "❌ Failed to change password" });
  }
};

const deleteAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.clearCookie("accessToken").clearCookie("refreshToken");
  res.json({ message: "Account deleted successfully" });
};

export {
  CreateUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  verifyUser,
  deleteAccount,
  changePassword,
  updateUsername,
};

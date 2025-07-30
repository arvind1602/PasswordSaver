import crypto from "crypto";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.Model.js";

// Temporary store (replace with DB or Redis in production)
const codes = new Map();

export const sendCode = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  
  if (!email) throw new ApiError("Email is required", 400);

  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 min

  codes.set(email, { code, expiresAt });

  await sendVerificationEmail(email, code);

  res.json({ message: "Verification code sent" });
};

export const verifyCode = async (req, res) => {
  const { email, code, username } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res
      .status(400)
      .json({ message: "user not found create acount first" });
  }
  if (user.verification) {
    return res.status(400).json({ message: "user is already verifyed" });
  }
  const stored = codes.get(email);

  if (!stored || stored.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Code expired or not found" });
  }

  if (stored.code.toString() !== code) {
    return res.status(400).json({ message: "Invalid code" });
  }

  codes.delete(email);
  user.verification = true;
  await user.save();
  res.json({ message: "Email verified successfully" });
};

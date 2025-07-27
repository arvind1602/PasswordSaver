import moogose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 4,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    passkey: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = moogose.model("User", UserSchema);
export default User;
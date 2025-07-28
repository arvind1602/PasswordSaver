import mongoose, { Schema } from "mongoose";

const PasswordEntrySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PasswordEntry = mongoose.model("PasswordEntry", PasswordEntrySchema);
export default PasswordEntry;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    full_name: {
      type: String,
      required: false,
    },
    additional_name: {
      type: String,
      required: false,
    },
    pronounce: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    link_alias: {
      type: String,
      required: false,
    },
    userprofile_image: {
      type: String,
      required: false,
    }
  },
  { timestamps: true },
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

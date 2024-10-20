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
      default: "Today's Steps, Tomorrow's Memories: Your Daily Journey Companion. Capture life's moments, reflect, and cherish memories. Your personal journaling companion, making every day memorable.",
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
    },
    followersLists: {
      type: [
        {
          follower_id: { type: String, required: false },
          follower_username: { type: String, required: false },
          follower_full_name: { type: String, required: false },
          follower_profile_image: { type: String, required: false },
        },
        { timestamps: true },
      ],
      required: false,
    },
    followingsLists: {
      type: [
        {
          follower_id: { type: String, required: false, unique: true },
          follower_username: { type: String, required: false, unique: true },
          follower_full_name: { type: String, required: false, unique: true },
          follower_profile_image: { type: String, required: false, unique: true },
        },
        { timestamps: true },
      ],
      required: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

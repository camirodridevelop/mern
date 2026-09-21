const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    active: { type: Boolean, default: true },
    avatar: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

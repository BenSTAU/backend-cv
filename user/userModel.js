import mongoose from "mongoose";

// Modèle Mongoose pour les utilisateurs
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "visitor"],
      default: "visitor",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

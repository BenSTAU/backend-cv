import mongoose from "mongoose";

// Modèle Mongoose pour les expériences

const competenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    master: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Competence = mongoose.model("Competence", competenceSchema);

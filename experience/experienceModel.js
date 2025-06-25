import mongoose from "mongoose";

// Modèle Mongoose pour les expériences

const experienceSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Experience = mongoose.model("Experience", experienceSchema);

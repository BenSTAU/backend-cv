import mongoose from "mongoose";

// Modèle Mongoose pour les formations
const formationSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    option: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Formation = mongoose.model("Formation", formationSchema);

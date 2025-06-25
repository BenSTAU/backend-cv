import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from "./experienceController.js";

export const experienceRouter = express.Router();

// Définition des routes liées à l'utilisateur

experienceRouter.get("/", getExperience);
experienceRouter.post("/", verifyToken, createExperience);
experienceRouter.patch("/:id", verifyToken, updateExperience);
experienceRouter.delete("/:id", verifyToken, deleteExperience);

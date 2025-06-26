import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createCompetence,
  deleteCompetence,
  getCompetence,
  updateCompetence,
} from "./competenceController.js";

export const competenceRouter = express.Router();

// Définition des routes liées à l'utilisateur

competenceRouter.get("/", getCompetence);
competenceRouter.post("/", verifyToken, createCompetence);
competenceRouter.patch("/:id", verifyToken, updateCompetence);
competenceRouter.delete("/:id", verifyToken, deleteCompetence);

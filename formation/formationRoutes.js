import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createFormation,
  deleteFormation,
  getFormation,
  updateFormation,
} from "./formationController.js";

export const formationRouter = express.Router();

// Définition des routes liées à l'utilisateur

formationRouter.get("/", getFormation);
formationRouter.post("/", verifyToken, createFormation);
formationRouter.patch("/:id", verifyToken, updateFormation);
formationRouter.delete("/:id", verifyToken, deleteFormation);

import express from "express";
import { checkAuth, login, logout, register } from "./userController.js";

export const userRouter = express.Router();

// Définition des routes liées à l'utilisateur

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/checkAuth", checkAuth);

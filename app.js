import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

import { userRouter } from "./user/userRoutes.js";
import { formationRouter } from "./formation/formationRoutes.js";
import { experienceRouter } from "./experience/experienceRoutes.js";
import { competenceRouter } from "./competences/competenceRoutes.js";

const app = express();
const PORT = process.env.PORT;

async function connect() {
  // MongoDB connection
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
connect().catch((err) => {
  console.error("Error connecting to the database:", err);
  process.exit(1);
});

// Middleware
app.use(express.json());
app.use(json());
app.use(
  cors({
    origin: process.env.URL_FRONT, // adresse front
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api/formation", formationRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/competence", competenceRouter);

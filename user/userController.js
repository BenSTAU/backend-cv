import bcrypt from "bcrypt";
import { User } from "./userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Contrôleur pour la gestion des utilisateurs (inscription, connexion, etc.)

// Inscription d'un nouvel utilisateur
export async function register(req, res) {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur crée" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

// Connexion d'un utilisateur
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username }); // <-- await ici
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isValid = await bcrypt.compare(password, user.password); // <-- await ici
    if (!isValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none", // <-- important pour cross-domain
      secure: true, // <-- obligatoire avec sameSite: "none"
      maxAge: 60 * 60 * 1000,
    });
    res.status(202).json({ message: "Login Réussi !" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

// Déconnexion d'un utilisateur
export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "logout réussi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

// Vérification de l'authentification via le token
export async function checkAuth(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({
      message: "Authorized",
      role: decoded.role,
      username: decoded.username, // <-- Ajoute ceci
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

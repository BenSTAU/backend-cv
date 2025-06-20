import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware pour vérifier le token JWT et le rôle admin
export default function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Accès non autorisé" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "Accès non autorisé" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json({ message: "server Error", error: err });
  }
}

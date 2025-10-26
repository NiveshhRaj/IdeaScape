// routes/UserRoutes.js
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Add or remove favorite
router.post("/favorites", verifyToken, async (req, res) => {
  const { image } = req.body; // { id, imageUrl, description }
  try {
    const user = await User.findById(req.user);

    const exists = user.favorites.find((fav) => fav.id === image.id);
    if (exists) {
      user.favorites = user.favorites.filter((fav) => fav.id !== image.id);
    } else {
      user.favorites.push(image);
    }

    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Failed to update favorites" });
  }
});

// Get favorites
router.get("/favorites", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
});

export default router;

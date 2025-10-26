import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 6000;
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);

app.get("/api/search/:query", async (req, res) => {
  const { query } = req.params;
  const count = req.query.count || 20;
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: count },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.listen(PORT, () => console.log("Server running on port 5000"));

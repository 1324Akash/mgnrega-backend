// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Worker from "./models/Worker.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// ✅ Default route
app.get("/", (req, res) => res.send("Backend connected successfully 🚀"));

// ✅ Add Worker
app.post("/api/workers", async (req, res) => {
  try {
    const { name, village } = req.body;
    if (!name || !village) {
      return res.status(400).json({ error: "Name and village are required" });
    }

    const worker = new Worker({ name, village });
    const savedWorker = await worker.save();
    res.status(201).json(savedWorker);
  } catch (err) {
    console.error("❌ Error saving worker:", err);
    res.status(500).json({ error: "Server error while saving worker" });
  }
});

// ✅ Get all workers
app.get("/api/workers", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

// ✅ Update worker
app.put("/api/workers/:id", async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(worker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete worker
app.delete("/api/workers/:id", async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: "Worker deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Health check route
app.get("/api/test", (req, res) => res.json({ message: "API is working properly 🚀" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

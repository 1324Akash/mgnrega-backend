import express from "express";
import Worker from "../models/workerModel.js";
app.use(express.json());

const router = express.Router();

// Get all workers
router.get("/", async (req, res) => {
  const workers = await Worker.find();
  res.json(workers);
});

// Add new worker
router.post("/", async (req, res) => {
  const newWorker = new Worker(req.body);
  await newWorker.save();
  res.json({ message: "Worker added successfully" });
});

export default router;

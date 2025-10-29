// models/Worker.js
import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  village: { type: String, required: true },
});

export default mongoose.model("Worker", workerSchema);

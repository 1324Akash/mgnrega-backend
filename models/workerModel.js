import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: String,
  jobCardNumber: String,
  daysWorked: Number,
  wagesEarned: Number,
});

export default mongoose.model("Worker", workerSchema);

import mongoose from "mongoose";

const schema = new mongoose.Schema({
  district: String,
  performance: Array,
}, { timestamps: true });

export default mongoose.model("DistrictData", schema);

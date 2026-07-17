const mongoose = require("mongoose");

const softwareRequestSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  categories: [String], // e.g. ["editing", "coding", "photography", "animation"]
  description: { type: String },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SoftwareRequest", softwareRequestSchema);

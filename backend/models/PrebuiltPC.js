const mongoose = require("mongoose");

const prebuiltPCSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tier: { type: String, default: "Standard" }, // Starter | Standard | Pro | Elite
  specs: {
    cpu: String,
    gpu: String,
    ram: String,
    storage: String,
  },
  price: { type: Number, required: true },
  tagline: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("PrebuiltPC", prebuiltPCSchema);

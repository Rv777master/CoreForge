const mongoose = require("mongoose");

const buildOrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  components: {
    cpu: String,
    gpu: String,
    motherboard: String,
    ram: String,
    storage: String,
    cooling: String,
    thermalPaste: String,
    psu: String,
    pcCase: String,
  },
  estimatedTotal: { type: Number, default: 0 },
  notes: { type: String },
  status: { type: String, default: "pending" }, // pending | confirmed | building | ready
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BuildOrder", buildOrderSchema);

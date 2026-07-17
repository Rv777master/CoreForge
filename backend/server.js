require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const buildRoutes = require("./routes/builds");
const softwareRoutes = require("./routes/software");
const prebuiltRoutes = require("./routes/prebuilt");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/coreforge";

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "CoreForge backend is running" });
});

app.use("/api/builds", buildRoutes);
app.use("/api/software-requests", softwareRoutes);
app.use("/api/prebuilt", prebuiltRoutes);
app.use("/api/contact", contactRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`CoreForge backend running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

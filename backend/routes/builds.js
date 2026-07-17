const express = require("express");
const router = express.Router();
const BuildOrder = require("../models/BuildOrder");
const { sendNotification } = require("../utils/mailer");

router.get("/", async (req, res) => {
  const builds = await BuildOrder.find().sort({ createdAt: -1 });
  res.json(builds);
});

router.post("/", async (req, res) => {
  try {
    const build = new BuildOrder(req.body);
    await build.save();

    const partsList = Object.entries(build.components || {})
      .map(([part, name]) => `${part}: ${name}`)
      .join("\n");

    await sendNotification(
      `New build ticket from ${build.customerName}`,
      `Name: ${build.customerName}\nEmail: ${build.email}\nPhone: ${build.phone || "-"}\n\nParts:\n${partsList}\n\nEstimated total: ₹${build.estimatedTotal}\n\nNotes:\n${build.notes || "-"}`
    );

    res.status(201).json(build);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id/status", async (req, res) => {
  const build = await BuildOrder.findById(req.params.id);
  if (!build) return res.status(404).json({ error: "Build not found" });
  build.status = req.body.status;
  await build.save();
  res.json(build);
});

module.exports = router;

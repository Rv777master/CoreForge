const express = require("express");
const router = express.Router();
const SoftwareRequest = require("../models/SoftwareRequest");
const { sendNotification } = require("../utils/mailer");

router.get("/", async (req, res) => {
  const requests = await SoftwareRequest.find().sort({ createdAt: -1 });
  res.json(requests);
});

router.post("/", async (req, res) => {
  try {
    const request = new SoftwareRequest(req.body);
    await request.save();

    await sendNotification(
      `New software setup request from ${request.customerName}`,
      `Name: ${request.customerName}\nEmail: ${request.email}\nCategories: ${(request.categories || []).join(", ")}\n\nDetails:\n${request.description || "-"}`
    );

    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

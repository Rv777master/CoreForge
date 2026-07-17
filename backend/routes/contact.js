const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");
const { sendNotification } = require("../utils/mailer");

router.get("/", async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

router.post("/", async (req, res) => {
  try {
    const msg = new ContactMessage(req.body);
    await msg.save();

    await sendNotification(
      `New contact message from ${msg.name}`,
      `Name: ${msg.name}\nEmail: ${msg.email}\n\nMessage:\n${msg.message}`
    );

    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

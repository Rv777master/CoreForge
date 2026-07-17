const express = require("express");
const router = express.Router();
const PrebuiltPC = require("../models/PrebuiltPC");

router.get("/", async (req, res) => {
  const pcs = await PrebuiltPC.find().sort({ price: 1 });
  res.json(pcs);
});

module.exports = router;

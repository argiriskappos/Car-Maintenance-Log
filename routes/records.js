const express = require("express");
const router = express.Router();
const Record = require('../models/MaintenanceRecord');

// Homepage shows all records
router.get("/", async (req, res) => {
  const records = await Record.find({});
  res.render("records/index", { records });
});

// Form to add a new record
router.get("/new", (req, res) => {
  res.render("records/new");
});

// Add new record
router.post("/", async (req, res) => {
  const record = new Record(req.body.record);
  await record.save();
  res.redirect("/"); // back to homepage
});

module.exports = router;



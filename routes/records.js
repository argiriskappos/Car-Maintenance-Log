const express = require("express");
const router = express.Router();
const Record = require("../models/MaintenanceRecord");
const { ensureAuthenticated } = require("../middleware/auth");

// ------------------------------
// READ — list all records (PUBLIC)
// ------------------------------
router.get("/", async (req, res) => {
  const records = await Record.find({}).sort({ serviceDate: -1 });
  res.render("records/index", { records });
});

// ------------------------------
// CREATE — form (AUTH ONLY)
// ------------------------------
router.get("/new", ensureAuthenticated, (req, res) => {
  res.render("records/new");
});

// ------------------------------
// CREATE — submit new record (AUTH ONLY)
// ------------------------------
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.redirect("/records");
  } catch (err) {
    console.error(err);
    res.render("records/new", { error: "Error saving record." });
  }
});

// ------------------------------
// READ — show single record (PUBLIC)
// ------------------------------
router.get("/:id", async (req, res) => {
  const record = await Record.findById(req.params.id);
  if (!record) return res.redirect("/records/");
  res.render("records/show", { record });
});

// ------------------------------
// UPDATE — edit form (AUTH ONLY)
// ------------------------------
router.get("/:id/edit", ensureAuthenticated, async (req, res) => {
  const record = await Record.findById(req.params.id);
  res.render("records/edit", { record });
});

// ------------------------------
// UPDATE — submit updates (AUTH ONLY)
// ------------------------------
router.put("/:id", ensureAuthenticated, async (req, res) => {
  await Record.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/records/${req.params.id}`);
});

// ------------------------------
// DELETE — remove record (AUTH ONLY)
// ------------------------------
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.redirect("/records");
});

module.exports = router;

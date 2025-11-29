const MaintenanceRecord = require('../models/MaintenanceRecord');

// LIST ALL RECORDS
exports.index = async (req, res) => {
  const records = await MaintenanceRecord.find().sort({ serviceDate: -1 });
  res.render('records/index', { records }); // you use index.ejs
};

// SHOW NEW RECORD FORM
exports.newForm = (req, res) => {
  res.render('records/new');
};

// CREATE NEW RECORD
exports.create = async (req, res) => {
  try {
    await MaintenanceRecord.create(req.body);  // USE req.body, not req.body.record
    res.redirect('/records');
  } catch (err) {
    console.error(err);
    res.render('records/new', { error: "Error creating record." });
  }
};

// SHOW SINGLE RECORD
exports.show = async (req, res) => {
  const record = await MaintenanceRecord.findById(req.params.id);
  if (!record) return res.redirect('/records');
  res.render('records/show', { record });
};

// SHOW EDIT FORM
exports.editForm = async (req, res) => {
  const record = await MaintenanceRecord.findById(req.params.id);
  if (!record) return res.redirect('/records');
  res.render('records/edit', { record });
};

// UPDATE RECORD
exports.update = async (req, res) => {
  await MaintenanceRecord.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/records/${req.params.id}`);
};

// DELETE RECORD
exports.delete = async (req, res) => {
  await MaintenanceRecord.findByIdAndDelete(req.params.id);
  res.redirect('/records');
};

const MaintenanceRecord = require('../models/MaintenanceRecord');

// LIST
exports.index = async (req, res) => {
  const records = await MaintenanceRecord.find().sort({ serviceDate: -1 });
  res.render('records/list', { records });
};

// NEW FORM
exports.newForm = (req, res) => {
  res.render('records/new');
};

// CREATE
exports.create = async (req, res) => {
  await MaintenanceRecord.create(req.body.record);
  res.redirect('/records');
};

// SHOW
exports.show = async (req, res) => {
  const record = await MaintenanceRecord.findById(req.params.id);
  res.render('records/show', { record });
};

// EDIT FORM
exports.editForm = async (req, res) => {
  const record = await MaintenanceRecord.findById(req.params.id);
  res.render('records/edit', { record });
};

// UPDATE
exports.update = async (req, res) => {
  await MaintenanceRecord.findByIdAndUpdate(req.params.id, req.body.record);
  res.redirect(`/records/${req.params.id}`);
};

// DELETE
exports.delete = async (req, res) => {
  await MaintenanceRecord.findByIdAndDelete(req.params.id);
  res.redirect('/records');
};

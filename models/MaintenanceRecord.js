const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  cost: { type: Number, required: true, min: 0 },
  location: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MaintenanceRecord', maintenanceSchema);

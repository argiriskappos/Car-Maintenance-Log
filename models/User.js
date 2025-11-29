// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  provider: String,          // 'google' or 'github'
  providerId: String,        // profile id
  displayName: String,
  email: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

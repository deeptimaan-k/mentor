// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,  // For Google login
  password: String,  // For local login
});

module.exports = mongoose.model('User', userSchema);

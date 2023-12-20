const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  // Add other user fields as needed
});

module.exports = mongoose.model("User", userSchema);

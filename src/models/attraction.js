const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  location: String,
  // Additional fields as needed
});

module.exports = mongoose.model("Attraction", attractionSchema);

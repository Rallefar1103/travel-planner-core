const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  name: String,
  type: String,
  location: String,
  pricePerNight: Number,
  amenities: [String],
  // Additional fields and references as needed
});

module.exports = mongoose.model("Accommodation", accommodationSchema);

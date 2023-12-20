const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  isBar: Boolean,
  location: String,
  // Add array of reviews or other relevant fields
});

module.exports = mongoose.model("Restaurant", restaurantSchema);

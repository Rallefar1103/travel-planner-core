const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  title: String,
  description: String,
  // Additional fields as needed
});

module.exports = mongoose.model("Itinerary", attractionSchema);

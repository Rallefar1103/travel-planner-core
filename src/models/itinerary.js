const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  title: String,
  description: String,
  recommendations: String,
});

module.exports = mongoose.model("Itinerary", itinerarySchema);

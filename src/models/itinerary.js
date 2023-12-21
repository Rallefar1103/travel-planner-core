const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
});

module.exports = mongoose.model("Itinerary", itinerarySchema);

const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: String,
  country: String,
  description: String,
  // Add references or subdocuments for attractions, accommodations, etc.
});

module.exports = mongoose.model("Destination", destinationSchema);

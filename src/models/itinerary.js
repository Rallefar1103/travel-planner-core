const mongoose = require("mongoose");

const diningOptionsSchema = new mongoose.Schema({
  type: String,
  cuisine: String,
  priceRange: String,
});

const attractionOptionsSchema = new mongoose.Schema({
  type: [String], // Array of strings
});

const userPreferencesSchema = new mongoose.Schema({
  diningOptions: diningOptionsSchema,
  attractionOptions: attractionOptionsSchema,
});

const itinerarySchema = new mongoose.Schema({
  title: String,
  destination: String,
  duration: String,
  budget: String,
  userPreferences: userPreferencesSchema,
  recommendedItinerary: String, // or another Schema if it's more complex
});

module.exports = mongoose.model("Itinerary", itinerarySchema);

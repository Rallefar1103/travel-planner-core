const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  rating: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);

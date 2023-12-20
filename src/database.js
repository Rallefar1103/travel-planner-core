const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_URI; // MongoDB Atlas URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB successfully");
});

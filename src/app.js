const express = require("express");
const app = express();
require("./database"); // Initialize database

app.use(express.json()); // Middleware for JSON parsing

// Itinerary routes
const itineraryRoutes = require("./routes/itineraryRoutes");
app.use("/itineraries", itineraryRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Core service running on http://localhost:${PORT}`);
});

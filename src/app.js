const express = require("express");
//require("./database"); // Initialize database
require("dotenv").config();
const mockYelpApiCall = require("../src/mocking/mockingExternalAPICall");
const mockGPTCall = require("../src/mocking/mockingRecommenderAPICall");

const app = express();

app.use(express.json()); // Middleware for JSON parsing

// Itinerary routes
const itineraryRoutes = require("./routes/itineraryRoutes");
app.use("/api", itineraryRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Core service running on http://localhost:${PORT}`);
  console.log("Calling the mock yelp api call now");
  const mockItineraryData = {
    title: "Copenhagen Itinerary 2024",

    destination: "Copenhagen",
    duration: "14",
    budget: "2000",

    userPreferences: {
      destination: "Copenhagen",
      diningOptions: {
        type: "restaurants",
        cuisine: "italian",
        priceRange: "3",
      },
    },
    recommendations: "",
  };
  const recommendationData = mockYelpApiCall(mockItineraryData);
  const itinerary = mockGPTCall(recommendationData, mockItineraryData);
  console.log("ChatGPT itinerary suggestion", itinerary);
});

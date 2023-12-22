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
  res.status(500).send("CORE-SERVICE: Something went wrong!");
});

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  console.log(`Core service running on http://localhost:${PORT}`);
  //await mockIntegration();
});

async function mockIntegration() {
  const mockItineraryData = {
    title: "Copenhagen Itinerary 2024",

    destination: "Copenhagen",
    duration: "14",
    budget: "2000",

    userPreferences: {
      diningOptions: {
        type: "restaurants",
        cuisine: "italian",
        priceRange: "3",
      },
      attractionOptions: {
        type: ["art", "sightseeing"],
      },
    },
    recommendedItinerary: "",
  };
  const recommendationData = await mockYelpApiCall(mockItineraryData);
  const finalResponse = await mockGPTCall(
    recommendationData,
    mockItineraryData
  );
  console.log(
    "ChatGPT itinerary suggestion",
    finalResponse.itinerary.recommendedItinerary
  );
}

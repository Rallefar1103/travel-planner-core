require("dotenv").config();

const axios = require("axios");
const {
  processYelpData,
  prepareYelpData,
} = require("../helpers/yelpDataHelper");

async function mockYelpApiCall() {
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

  // Get personalized and better results from Yelp
  const yelpData = prepareYelpData(mockItineraryData.userPreferences);

  console.log("Prepared Yelp Data", yelpData);

  // Call the External-API service
  try {
    const yelpResults = await axios.post(
      process.env.EXTERNAL_APIS_URL_YELP,
      yelpData
    );

    console.log("Data fetched from Yelp", yelpResults);

    // Process fetched Yelp Data
    const listOfBusinesses = processYelpData(
      yelpResults.data,
      mockItineraryData.duration
    );

    console.log("Yelp data processed", listOfBusinesses);

    const recommendationData = {
      title: mockItineraryData.title,
      destination: mockItineraryData.destination,
      duration: mockItineraryData.duration,
      budget: mockItineraryData.budget,
      restaurants: listOfBusinesses,
    };

    console.log("Recommendation data for GPT", recommendationData);
  } catch (error) {
    console.error("Error during Yelp API call:", error);
  }
}

module.exports = mockYelpApiCall;

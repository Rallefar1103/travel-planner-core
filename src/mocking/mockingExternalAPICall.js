require("dotenv").config();

const axios = require("axios");
const {
  processYelpData,
  prepareYelpData,
} = require("./helpers/yelpDataHelper");

async function mockYelpApiCall() {
  const mockItineraryData = {
    title: "Copenhagen Itinerary 2024",
    description:
      "An itinerary that lasts 14 days in Copenhagen, with a budget of $2,000",
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
    const listOfBusinesses = processYelpData(yelpResults.data);

    console.log("Yelp data processed", listOfBusinesses);

    const recommendationData = {
      title: mockItineraryData.title,
      description: mockItineraryData.description,
      restaurants: listOfBusinesses,
    };

    console.log("Recommendation data for GPT", recommendationData);
  } catch (error) {
    console.error("Error during Yelp API call:", error);
  }
}

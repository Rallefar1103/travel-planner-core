require("dotenv").config();

const axios = require("axios");

async function mockGPTCall(recommendationData, itineraryToMake) {
  // Forward data to the ChatGPT recommender-service
  console.log("About to query the recommender-service");
  try {
    const recommenderResponse = await axios.post(
      `${process.env.RECOMMENDER_URL}/recommend`,
      recommendationData
    );

    console.log("ChatGPT response", recommenderResponse);

    itineraryToMake.recommendations = recommenderResponse.data;

    // const newItinerary = new Itinerary(itineraryToMake);
    // const savedItinerary = await newItinerary.save(); // save to mongoDB

    // Create the final response with recommended data added
    const finalResponse = {
      itinerary: {
        id: "1234",
        destination: itineraryToMake.destination,
        duration: itineraryToMake.duration,
        budget: itineraryToMake.budget,
        recommendedItinerary: recommenderResponse.data,
      },
    };

    return finalResponse;
  } catch (error) {
    console.error("Error calling the recommender-service: ", error);
    // Decide how to handle errors from the recommender-service.
  }
}

module.exports = mockGPTCall;

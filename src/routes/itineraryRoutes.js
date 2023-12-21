const express = require("express");
const router = express.Router();
const axios = require("axios");
const Itinerary = require("../models/itinerary");
const {
  processYelpData,
  prepareYelpData,
} = require("../helpers/yelpDataHelper");

const recommenderURL = process.env.RECOMMENDER_URL;

router.post("/itineraries", async (req, res) => {
  try {
    const { title, destination, duration, budget, userPreferences } = req.body;

    const itineraryToMake = {
      title: title,
      destination: destination,
      duration: duration,
      budget: budget,
      userPreferences: userPreferences,
      recommendedItineraryDescription: "",
    };

    // Get personalized and better results from Yelp
    const yelpData = prepareYelpData(itineraryToMake);

    // Call the External-API service
    const yelpResults = await axios.post(
      env.process.EXTERNAL_APIS_URL_YELP,
      yelpData
    );

    // Process fetched Yelp Data
    const listOfRestaurants = processYelpData(
      yelpResults.data,
      itineraryToMake.duration
    );

    const recommendationData = {
      title: itineraryToMake.title,
      destination: itineraryToMake.destination,
      duration: itineraryToMake.duration,
      budget: itineraryToMake.budget,
      attractions: itineraryToMake.userPreferences.attractions.type,
      restaurants: listOfRestaurants,
    };

    // Forward data to the ChatGPT recommender-service
    try {
      const recommenderResponse = await axios.post(
        `${recommenderURL}/recommend`,
        recommendationData
      );

      itineraryToMake.recommendedItineraryDescription =
        recommenderResponse.data;

      const newItinerary = new Itinerary(itineraryToMake);
      const savedItinerary = await newItinerary.save(); // save to mongoDB

      // Create the final response with recommended data added
      const finalResponse = {
        itinerary: {
          id: savedItinerary._id,
          destination: savedItinerary.destination,
          duration: savedItinerary.duration,
          budget: savedItinerary.budget,
          userPreferences: savedItinerary.userPreferences,
          recommendedItineraryDescription:
            savedItinerary.recommendedItineraryDescription,
        },
      };

      // Send the recommended itinerary back to graphql-server
      res.status(201).json(finalResponse);
    } catch (error) {
      console.error("Error calling the recommender-service: ", error);
      // Decide how to handle errors from the recommender-service.
    }
  } catch (error) {
    res.status(500).send("Error creating itinerary");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");
const Itinerary = require("../models/itinerary");
const {
  processYelpData,
  prepareYelpData,
} = require("../helpers/yelpDataHelper");

require("dotenv").config();

router.post("/itineraries", async (req, res) => {
  console.log("WELCOME TO THE CORE-SERVICE!!");
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

    console.log(
      "Calling the YELP API now on ",
      process.env.EXTERNAL_APIS_URL_YELP
    );

    // // Call the External-API service
    const yelpResults = await axios.post(
      process.env.EXTERNAL_APIS_URL_YELP,
      yelpData
    );

    console.log("Made it back from the Yelp service");

    // Process fetched Yelp Data
    const topRestaurant = processYelpData(yelpResults.data);

    console.log("This is the top pick restaurant \n", topRestaurant);

    const recommendationData = {
      title: itineraryToMake.title,
      destination: itineraryToMake.destination,
      duration: itineraryToMake.duration,
      budget: itineraryToMake.budget,
      attractions: itineraryToMake.userPreferences.attractionOptions.type,
      restaurant: topRestaurant,
    };

    const recommenderResponse = await axios.post(
      process.env.RECOMMENDER_URL,
      recommendationData
    );

    console.log("Made it back from recommender service");

    itineraryToMake.recommendedItineraryDescription =
      recommenderResponse.data.recommendedItinerary;

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
    console.error("CORE-SERVICE: Error creating itinerary: \n", error);
    res.status(500).send("CORE-SERVICE: Error creating itinerary");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Itinerary = require("../models/itinerary");

const recommenderURL = process.env.RECOMMENDER_URL;

router.post("/itineraries", async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const newItinerary = new Itinerary({ id, title, description });
    const savedItinerary = await newItinerary.save(); // save to mongoDB

    // Prepare data for the recommender-service
    const recommendationData = {
      id: savedItinerary._id,
      title: savedItinerary.title,
      description: savedItinerary.description,
    };

    // Forward data to the ChatGPT recommender-service
    try {
      const recommenderResponse = await axios.post(
        `${recommenderURL}/recommend`,
        recommendationData
      );

      savedItinerary.recommendations = recommenderResponse.data;

      // Create the final response with recommended data.
      const finalResponse = {
        itinerary: savedItinerary,
        recommendations: savedItinerary.recommendationData,
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

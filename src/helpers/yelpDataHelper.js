function prepareYelpData(itinerayData) {
  return {
    location: itinerayData.destination,
    term: itinerayData.userPreferences.diningOptions.type, // e.g., 'restaurant', 'bar'
    categories: itinerayData.userPreferences.diningOptions.cuisine, // e.g., 'italian' or 'japanese'
    price: itinerayData.userPreferences.diningOptions.priceRange, // e.g., '1', '2', '3', '4'
  };
}

function processYelpData(yelpData) {
  const restaurants = yelpData.map((business) => ({
    name: business.name,
    rating: business.rating,
    price: business.price,
    categories: business.categories
      .map((category) => category.title)
      .join(", "),
    location: business.location.address1,
  }));

  restaurants.sort((a, b) => b.rating - a.rating);

  return restaurants[0];
}

module.exports = {
  prepareYelpData,
  processYelpData,
};

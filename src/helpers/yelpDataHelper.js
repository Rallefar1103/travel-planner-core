function prepareYelpData(userPreferences) {
  return {
    location: userPreferences.destination,
    term: userPreferences.diningOptions.type, // e.g., 'restaurant', 'bar'
    categories: userPreferences.diningOptions.cuisine, // e.g., 'italian', 'japanese'
    price: userPreferences.diningOptions.priceRange, // e.g., '1', '2', '3', '4'
  };
}

function processYelpData(yelpData, duration) {
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
  return restaurants.slice(0, duration);
}

module.exports = {
  prepareYelpData,
  processYelpData,
};

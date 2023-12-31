function prepareYelpData(itinerayData) {
  return {
    location: itinerayData.destination,
    term: itinerayData.userPreferences.diningOptions.type,
    categories: itinerayData.userPreferences.diningOptions.cuisine,
    price: _getPriceRange(
      itinerayData.userPreferences.diningOptions.priceRange
    ),
  };
}

function processYelpData(yelpData, restaurantPricePreference) {
  const priceLevels = { "$": 1, "$$": 2, "$$$": 3, "$$$$": 4 };

  const restaurants = yelpData.map((business) => ({
    name: business.name,
    rating: business.rating,
    price: business.price,
    categories: business.categories
      .map((category) => category.title)
      .join(", "),
    location: business.location.address1,
  }));

  const userPriceLevel = priceLevels[restaurantPricePreference];

  restaurants.sort((a, b) => {
    const aScore = a.rating - Math.abs(a.price - userPriceLevel);
    const bScore = b.rating - Math.abs(b.price - userPriceLevel);
    return bScore - aScore;
  });

  return restaurants[0];
}

function _getPriceRange(priceRange) {
  if (priceRange === "$") {
    return "1";
  }

  if (priceRange === "$$") {
    return "2";
  }

  if (priceRange === "$$$") {
    return "3";
  }

  return "4";
}

module.exports = {
  prepareYelpData,
  processYelpData,
};

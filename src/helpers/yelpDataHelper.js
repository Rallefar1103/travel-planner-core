function prepareYelpData(userPreferences) {
  return {
    location: userPreferences.destination,
    term: userPreferences.diningOptions.type, // e.g., 'restaurant', 'bar'
    categories: userPreferences.diningOptions.cuisine, // e.g., 'italian', 'japanese'
    price: userPreferences.diningOptions.priceRange, // e.g., '1', '2', '3', '4'
  };
}

// returns a list of businesses formatted into an object
//{
//   "id": "Sx8f7NP8WKeUuvama1Lbyw",
//   "alias": "spaghetteria-la-perla-københavn",
//   "name": "Spaghetteria La Perla",
//   "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/eUZmcI8AZ1AMQZ6lKlTKuA/o.jpg",
//   "is_closed": false,
//   "url": "https://www.yelp.com/biz/spaghetteria-la-perla-k%C3%B8benhavn?adjust_creative=zBrSNJ7ItE5FxhWzQY5BMw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=zBrSNJ7ItE5FxhWzQY5BMw",
//   "review_count": 73,
//   "categories": [
//     {
//       "alias": "italian",
//       "title": "Italian"
//     }
//   ],
//   "rating": 4.5,
//   "coordinates": {
//     "latitude": 55.682507,
//     "longitude": 12.576934
//   },
//   "transactions": [],
//   "price": "$$",
//   "location": {
//     "address1": "Landemærket 27",
//     "address2": "",
//     "address3": "",
//     "city": "Copenhagen",
//     "zip_code": "1119",
//     "country": "DK",
//     "state": "84",
//     "display_address": [
//       "Landemærket 27",
//       "1119 Copenhagen",
//       "Denmark"
//     ]
//   },
//   "phone": "+4533337005",
//   "display_phone": "+45 33 33 70 05",
//   "distance": 1657.3494570752405
// },

function processYelpData(yelpData) {
  return yelpData.map((business) => ({
    name: business.name,
    rating: business.rating,
    price: business.price,
    categories: business.categories
      .map((category) => category.title)
      .join(", "),
    location: business.location.address1,
  }));
}

module.exports = {
  prepareYelpData,
  processYelpData,
};

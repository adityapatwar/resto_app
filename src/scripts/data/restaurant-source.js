import CONFIG from '../globals/config.js';

const RestaurantSource = {
  async listRestaurants() {
    const response = await fetch(`${CONFIG.BASE_URL}DATA.json`);
    const responseJson = await response.json();
    return responseJson.restaurants;
  },

  async detailRestaurant(id) {
    const response = await fetch(`${CONFIG.BASE_URL}DATA.json`);
    const responseJson = await response.json();
    return responseJson.restaurants.find(
      (restaurant) => restaurant.id === id
    );
  },
};

export default RestaurantSource;
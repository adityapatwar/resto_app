import API_ENDPOINT from '../globals/api-endpoint.js';

const RestaurantSource = {
  /**
   * Mendapatkan daftar restoran dari API.
   * @returns {Promise<Array>} - Daftar restoran.
   */
  async listRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      return responseJson.restaurants;
    } catch (error) {
      console.error('Error fetching restaurant list:', error);
      throw error;
    }
  },
  /**
   * Mendapatkan detail restoran berdasarkan ID.
   * @param {string} id - ID restoran.
   * @returns {Promise<Object>} - Detail restoran.
   */
  async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      return responseJson.restaurant;
    } catch (error) {
      console.error(`Error fetching details for restaurant ID ${id}:`, error);
      throw error;
    }
  },
  /**
   * Mencari restoran berdasarkan query.
   * @param {string} query - Kata kunci pencarian.
   * @returns {Promise<Array>} - Hasil pencarian restoran.
   */
  async searchRestaurants(query) {
    try {
      const response = await fetch(API_ENDPOINT.SEARCH(query));
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      return responseJson.restaurants;
    } catch (error) {
      console.error(`Error searching for restaurants with query "${query}":`, error);
      throw error;
    }
  },
  /**
   * Menambahkan ulasan restoran.
   * @param {Object} review - Data ulasan.
   * @returns {Promise<Array>} - Daftar ulasan terbaru.
   */
  async addReview(review) {
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      // Mendapatkan detail restoran terbaru
      const updatedRestaurant = await this.detailRestaurant(review.id);
      return updatedRestaurant.customerReviews;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },
};

export default RestaurantSource;
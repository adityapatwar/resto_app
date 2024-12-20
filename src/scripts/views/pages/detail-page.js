import UrlParser from '../../routes/url-parser.js';
import RestaurantSource from '../../data/restaurant-source.js';
import { createRestaurantDetailComponent } from '../../components/card-city.js';

const DetailPage = {
  async render() {
    return `
      <div class="container">
        <div id="restaurant" class="restaurant-detail"></div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      const restaurant = await RestaurantSource.detailRestaurant(url.id);
      const restaurantContainer = document.querySelector('#restaurant');

      if (restaurant) {
        restaurantContainer.innerHTML = createRestaurantDetailComponent(restaurant);

        // Optionally, you can add more sections like comments or related restaurants here
        // For example:
        // restaurantContainer.innerHTML += `
        //   <div class="comments-section">
        //     <h3>Comments</h3>
        //     <!-- Comments will be dynamically loaded here -->
        //   </div>
        // `;
      } else {
        restaurantContainer.innerHTML = '<h2>Restaurant not found</h2>';
      }
    } catch (error) {
      console.error(error);
      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = '<h2>Failed to load restaurant details.</h2>';
    }
  },
};

export default DetailPage;

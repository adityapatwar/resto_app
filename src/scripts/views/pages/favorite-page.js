import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb.js';
import { createRestaurantItemComponent } from '../../components/card-city.js';
import anime from 'animejs/lib/anime.es.js';

const FavoritePage = {
  async render() {
    return `
      <div class="container">
        <section class="featured-restaurants" id="favorite-restaurants">
          <h2 class="section-title">Your Favorite Restaurants</h2>
          <div class="featured-container">
            <div id="favorites" class="restaurant-grid"></div>
          </div>
        </section>
      </div>
    `;
  },

  async afterRender() {
    try {
      const favoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      const favoritesContainer = document.getElementById('favorites');
      if (favoriteRestaurants.length > 0) {
        favoritesContainer.innerHTML = favoriteRestaurants.map((restaurant) => createRestaurantItemComponent(restaurant)).join('');
        // Animations for favorite restaurant items
        anime({
          targets: '.restaurant-item-link',
          opacity: [0, 1],
          translateY: [50, 0],
          delay: anime.stagger(100),
          duration: 800,
          easing: 'easeOutExpo',
        });
      } else {
        favoritesContainer.innerHTML = '<p>You have no favorite restaurants yet.</p>';
      }
    } catch (error) {
      console.error('Error fetching favorite restaurants:', error);
      const favoritesContainer = document.getElementById('favorites');
      favoritesContainer.innerHTML = '<p>Failed to load favorite restaurants. Please try again later.</p>';
    }
  },
};

export default FavoritePage;
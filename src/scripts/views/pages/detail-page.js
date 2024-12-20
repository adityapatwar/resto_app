import UrlParser from '../../routes/url-parser.js';
import RestaurantSource from '../../data/restaurant-source.js';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb.js';
import { createRestaurantDetailComponent } from '../../components/card-city.js';
import anime from 'animejs/lib/anime.es.js';
import ModalHelper from '../../utils/modal-helper.js';

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
        // Initialize favorite button
        this._initFavoriteButton(restaurant.id);
        // Add event listener for review form submission
        const reviewForm = document.getElementById('review-form');
        reviewForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          const id = document.getElementById('restaurant-id').value;
          const name = document.getElementById('name').value.trim();
          const reviewText = document.getElementById('review').value.trim();
          if (name && reviewText) {
            try {
              const newReview = {
                id,
                name,
                review: reviewText,
              };
              await RestaurantSource.addReview(newReview);
              // Fetch updated restaurant details
              const updatedRestaurant = await RestaurantSource.detailRestaurant(id);
              const reviewsList = document.getElementById('reviews-list');
              reviewsList.innerHTML = updatedRestaurant.customerReviews.map((review) => `
                <div class="review">
                  <div class="review-header">
                    <h4 class="review-author">${review.name}</h4>
                    <span class="review-date">${review.date}</span>
                  </div>
                  <p class="review-content">${review.review}</p>
                </div>
              `).join('');
              // Clear the form
              reviewForm.reset();
              // Show a success message using ModalHelper
              ModalHelper.showModal({
                title: 'Success',
                body: 'Review added successfully!',
              });
            } catch (error) {
              console.error('Error adding review:', error);
              ModalHelper.showModal({
                title: 'Error',
                body: 'Failed to add review. Please try again later.',
              });
            }
          }
        });
        // Animations for restaurant detail
        anime({
          targets: '.restaurant-detail-container',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 1000,
          easing: 'easeOutExpo',
        });
        anime({
          targets: '.review-section, .customer-reviews',
          opacity: [0, 1],
          translateY: [20, 0],
          delay: anime.stagger(200),
          duration: 800,
          easing: 'easeOutExpo',
        });
      } else {
        restaurantContainer.innerHTML = '<h2>Restaurant not found</h2>';
      }
    } catch (error) {
      console.error(error);
      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = '<h2>Failed to load restaurant details.</h2>';
    }
  },

  /**
   * Initializes the favorite button by setting its state and adding event listeners.
   * @param {string} id - The ID of the restaurant.
   */
  async _initFavoriteButton(id) {
    const favoriteButton = document.getElementById('favorite-button');
    const favoriteIcon = document.getElementById('favorite-icon');
    // Check if the restaurant is already favorited
    const isFav = await FavoriteRestaurantIdb.isFavorite(id);
    if (isFav) {
      favoriteIcon.textContent = '❤️';
      favoriteButton.setAttribute('aria-label', 'Remove from favorites');
    } else {
      favoriteIcon.textContent = '♡';
      favoriteButton.setAttribute('aria-label', 'Add to favorites');
    }
    // Add click event listener
    favoriteButton.addEventListener('click', async () => {
      const isCurrentlyFav = await FavoriteRestaurantIdb.isFavorite(id);
      if (isCurrentlyFav) {
        // Remove from favorites
        await FavoriteRestaurantIdb.deleteRestaurant(id);
        favoriteIcon.textContent = '♡';
        favoriteButton.setAttribute('aria-label', 'Add to favorites');
        ModalHelper.showModal({
          title: 'Removed',
          body: 'Restaurant removed from favorites.',
        });
      } else {
        // Add to favorites
        const restaurant = await RestaurantSource.detailRestaurant(id);
        await FavoriteRestaurantIdb.putRestaurant(restaurant);
        favoriteIcon.textContent = '❤️';
        favoriteButton.setAttribute('aria-label', 'Remove from favorites');
        ModalHelper.showModal({
          title: 'Added',
          body: 'Restaurant added to favorites.',
        });
      }
    });
  },
};

export default DetailPage;
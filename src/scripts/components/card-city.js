/* eslint-disable no-unused-vars */
import CONFIG from '../globals/config.js';

export const createRestaurantItemComponent = (restaurant) => {
  const {
    id = '',
    name = 'N/A',
    pictureId = '',
    city = 'Unknown',
    rating = 'N/A',
    description = 'No description available.',
  } = restaurant;

  const pictureUrl = pictureId
    ? CONFIG.IMAGE_URL('small', pictureId)
    : 'https://via.placeholder.com/400x300?text=No+Image';

  return `
    <a href="#/detail/${id}" class="restaurant-item-link" aria-label="View details of ${name}">
      <div class="restaurant-item" tabindex="0">
        <img
          src="${pictureUrl}"
          alt="Image of ${name}"
          class="restaurant-image"
          loading="lazy"
        >
        <div class="restaurant-info">
          <h3 class="restaurant-name">${name}</h3>
          <p class="restaurant-city">City: ${city}</p>
          <p class="restaurant-rating">⭐ ${rating}</p>
          <p class="restaurant-description">${description.slice(0, 100)}...</p>
        </div>
      </div>
    </a>
  `;
};


export const createRestaurantDetailComponent = (restaurant) => {
  const {
    id = '',
    name = 'N/A',
    description = 'No description available.',
    city = 'Unknown',
    address = 'No address provided.',
    pictureId = '',
    menus = {},
    rating = 'N/A',
    categories = [],
    customerReviews = [],
  } = restaurant;

  const { foods = [], drinks = [] } = menus;

  const pictureUrl = pictureId
    ? CONFIG.IMAGE_URL('large', pictureId)
    : 'https://via.placeholder.com/800x600?text=No+Image';

  // Membuat kartu menu
  const createMenuCards = () => {
    const foodItems = foods.map((food) => `<li>${food.name}</li>`).join('');
    const drinkItems = drinks.map((drink) => `<li>${drink.name}</li>`).join('');
    return `
      <div class="menu-card">
        <h4>Foods</h4>
        <ul>
          ${foodItems || '<li>No foods available</li>'}
        </ul>
      </div>
      <div class="menu-card">
        <h4>Drinks</h4>
        <ul>
          ${drinkItems || '<li>No drinks available</li>'}
        </ul>
      </div>
    `;
  };

  // Membuat ulasan pelanggan
  const createCustomerReviews = (reviews) => {
    if (reviews.length === 0) {
      return '<p>No reviews available.</p>';
    }
    return reviews
      .map((review) => `
        <div class="review">
          <div class="review-header">
            <h4 class="review-author">${review.name}</h4>
            <span class="review-date">${review.date}</span>
          </div>
          <p class="review-content">${review.review}</p>
        </div>
      `)
      .join('');
  };

  return `
    <div class="restaurant-detail-container">
      <!-- Bagian Pertama -->
      <div class="detail-top">
        <img src="${pictureUrl}" alt="${name}" class="restaurant-detail-image" loading="lazy">
        <div class="detail-top-content">
          <div class="detail-header">
            <h2 class="restaurant-name">${name}</h2>
            <button id="favorite-button" class="favorite-button" aria-label="Add to favorites">
              <span id="favorite-icon">♡</span>
            </button>
          </div>
          <p class="restaurant-address"><strong>Address:</strong> ${address}, ${city}</p>
          <p class="restaurant-description">${description}</p>
        </div>
      </div>
      <!-- Bagian Kedua -->
      <div class="restaurant-menu">
        <h3>Menus</h3>
        <div class="menu-cards">
          ${createMenuCards()}
        </div>
      </div>
      <!-- Bagian Ketiga -->
      <section class="review-section">
        <h3>Add a Review</h3>
        <form id="review-form" aria-label="Add a review for ${name}">
          <input type="hidden" id="restaurant-id" value="${id}">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required aria-required="true" placeholder="Your Name">
          </div>
          <div class="form-group">
            <label for="review">Review:</label>
            <textarea id="review" name="review" required aria-required="true" placeholder="Your Review"></textarea>
          </div>
          <button type="submit" class="btn">Submit</button>
        </form>
      </section>
      <div class="customer-reviews">
        <h3>Customer Reviews</h3>
        <div id="reviews-list">
          ${createCustomerReviews(customerReviews)}
        </div>
      </div>
    </div>
  `;
};
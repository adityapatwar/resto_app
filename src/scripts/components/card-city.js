// src/scripts/components/card-city.js

export const createRestaurantDetailComponent = (restaurant) => {
    // Destructure necessary properties with fallback values
    const {
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
  
    // Function to create list items
    const createListItems = (items) => {
      if (items.length === 0) {
        return '<li>Not available</li>';
      }
      return items.map(item => `<li>${item.name}</li>`).join('');
    };
  
    // Function to create categories
    const createCategories = (categories) => {
      if (categories.length === 0) {
        return 'Uncategorized';
      }
      return categories.map(category => category.name).join(', ');
    };
  
    // Function to create customer reviews
    const createCustomerReviews = (reviews) => {
      if (reviews.length === 0) {
        return '<p>No reviews available.</p>';
      }
      return reviews.map(review => `
        <div class="review">
          <p><strong>${review.name}</strong> (${review.date})</p>
          <p>${review.review}</p>
        </div>
      `).join('');
    };
  
    // Use pictureId sebagai URL lengkap
    const pictureUrl = pictureId
      ? pictureId
      : 'https://via.placeholder.com/600x400?text=No+Image';
  
    return `
      <div class="restaurant-detail-container">
        <img src="${pictureUrl}" alt="${name}" class="restaurant-detail-image" loading="lazy">
        <div class="restaurant-info">
          <h2 class="restaurant-name">${name}</h2>
          <p class="restaurant-category">${createCategories(categories)}</p>
          <p class="restaurant-rating">⭐ ${rating}</p>
          <p class="restaurant-address">${address}, ${city}</p>
          <p class="restaurant-description">${description}</p>
  
          <div class="restaurant-menus">
            <h3>Menus</h3>
            <div class="menus">
              <div class="foods">
                <h4>Foods</h4>
                <ul>
                  ${createListItems(foods)}
                </ul>
              </div>
              <div class="drinks">
                <h4>Drinks</h4>
                <ul>
                  ${createListItems(drinks)}
                </ul>
              </div>
            </div>
          </div>
  
          <div class="customer-reviews">
            <h3>Customer Reviews</h3>
            ${createCustomerReviews(customerReviews)}
          </div>
        </div>
      </div>
    `;
  };
  
  export const createRestaurantItemComponent = (restaurant) => {
    const {
      id = '',
      name = 'N/A',
      pictureId = '',
      city = 'Unknown',
      rating = 'N/A',
    } = restaurant;
  
    // Gunakan pictureId sebagai URL lengkap
    const pictureUrl = pictureId
      ? pictureId
      : 'https://via.placeholder.com/400x300?text=No+Image';
  
    return `
      <a href="/#/detail/${id}" class="restaurant-item-link" aria-label="View details of ${name}">
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
          </div>
        </div>
      </a>
    `;
  };
  
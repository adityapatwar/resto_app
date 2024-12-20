const createRestaurantItemTemplate = (restaurant) => `
  <article class="restaurant-item">
    <img src="${restaurant.pictureId}" alt="${restaurant.name}">
    <div class="restaurant-info">
      <h4><a href="#/detail/${restaurant.id}">${restaurant.name}</a></h4>
      <p><strong>City:</strong> ${restaurant.city}</p>
      <p><strong>Rating:</strong> ⭐${restaurant.rating}</p>
      <p>${restaurant.description.substring(0, 100)}...</p>
    </div>
  </article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__name">${restaurant.name}</h2>
  <img class="restaurant__poster" src="${restaurant.pictureId}" alt="${restaurant.name}" />
  <div class="restaurant__info">
    <h3>Information</h3>
    <h4>City</h4>
    <p>${restaurant.city}</p>
    <h4>Rating</h4>
    <p>⭐${restaurant.rating}</p>
    <h4>Description</h4>
    <p>${restaurant.description}</p>
  </div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
};
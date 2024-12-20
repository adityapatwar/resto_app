// src/scripts/views/pages/home-page.js

import RestaurantSource from '../../data/restaurant-source.js';
import anime from 'animejs/lib/anime.es.js';
import {
  createRestaurantItemComponent,
} from '../../components/card-city.js';

const HomePage = {
  async render() {
    return `
      <section class="hero">
        <div class="hero-text">
          <h2>Welcome to RestoApp</h2>
          <p>Discover the best restaurants near you</p>
          <a href="/#featured-restaurants" class="btn">Explore Now</a>
        </div>
      </section>
      <div id="main-content" class="content">
        <section class="featured-restaurants" id="featured-restaurants">
          <h2 class="section-title">Featured Restaurants</h2>
          <div class="featured-container">
            <div class="search-filter">
              <input type="text" id="search-input" placeholder="Search restaurants..." aria-label="Search restaurants">
              <select id="city-filter" aria-label="Filter by city">
                <option value="">All Cities</option>
                <!-- Options will be populated by JavaScript -->
              </select>
            </div>
            <div id="restaurants" class="restaurant-grid"></div>
          </div>
        </section>
      </div>
    `;
  },

  async afterRender() {
    try {
      const restaurantsData = await RestaurantSource.listRestaurants();
      const restaurantGridContainer = document.querySelector('.restaurant-grid');
      const searchInput = document.querySelector('#search-input');
      const cityFilter = document.querySelector('#city-filter');

      // Function to render city options in the filter
      const renderCityOptions = (restaurants) => {
        const cities = [...new Set(restaurants.map((restaurant) => restaurant.city))];
        cities.sort();
        cities.forEach((city) => {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          cityFilter.appendChild(option);
        });
      };

      // Function to render restaurants
      const renderRestaurants = (restaurants) => {
        restaurantGridContainer.innerHTML = '';
        if (restaurants.length === 0) {
          restaurantGridContainer.innerHTML = '<p>No restaurants found.</p>';
          return;
        }
        restaurants.forEach((restaurant) => {
          restaurantGridContainer.innerHTML += createRestaurantItemComponent(restaurant);
        });

        // Animations for restaurant items
        anime({
          targets: '.restaurant-item',
          opacity: [0, 1],
          translateY: [50, 0],
          delay: anime.stagger(100),
          duration: 800,
          easing: 'easeOutExpo',
        });
      };

      // Function to filter restaurants based on search and city
      const filterRestaurants = () => {
        const searchText = searchInput.value.toLowerCase();
        const selectedCity = cityFilter.value;
        const filteredRestaurants = restaurantsData.filter((restaurant) => {
          const matchesSearch = restaurant.name.toLowerCase().includes(searchText);
          const matchesCity = selectedCity === '' || restaurant.city === selectedCity;
          return matchesSearch && matchesCity;
        });
        renderRestaurants(filteredRestaurants);
      };

      // Initial rendering
      renderCityOptions(restaurantsData);
      renderRestaurants(restaurantsData);

      // Event listeners for search and filter
      searchInput.addEventListener('input', filterRestaurants);
      cityFilter.addEventListener('change', filterRestaurants);

      // Hero section animations
      anime({
        targets: '.hero-text h2',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1000,
        easing: 'easeOutExpo',
      });
      anime({
        targets: '.hero-text p, .hero-text .btn',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(200, { start: 800 }),
        duration: 800,
        easing: 'easeOutExpo',
      });
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      const restaurantGridContainer = document.querySelector('.restaurant-grid');
      restaurantGridContainer.innerHTML = '<p>Failed to load restaurants. Please try again later.</p>';
    }
  },
};

export default HomePage;
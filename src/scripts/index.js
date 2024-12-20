import 'regenerator-runtime';
import '../styles/main.scss';
import anime from 'animejs/lib/anime.es.js';

console.log('Welcome to RestoApp!');

const menuButton = document.querySelector('#menu');
const drawer = document.querySelector('#drawer');
const closeButton = document.querySelector('#close-button');
const body = document.querySelector('body');
const mainContent = document.querySelector('main');
const header = document.querySelector('header');

menuButton.addEventListener('click', (event) => {
  event.stopPropagation();
  body.classList.toggle('nav-open');
  const expanded = body.classList.contains('nav-open');
  menuButton.setAttribute('aria-expanded', expanded);

  if (expanded) {
    // Animasi membuka drawer
    anime({
      targets: '#drawer',
      translateX: ['-100%', '0%'],
      duration: 500,
      easing: 'easeOutExpo',
    });
  } else {
    // Animasi menutup drawer
    anime({
      targets: '#drawer',
      translateX: ['0%', '-100%'],
      duration: 500,
      easing: 'easeInExpo',
    });
  }
});

closeButton.addEventListener('click', (event) => {
  event.stopPropagation();
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.focus();

  // Animasi menutup drawer
  anime({
    targets: '#drawer',
    translateX: ['0%', '-100%'],
    duration: 500,
    easing: 'easeInExpo',
    complete: function () {
      body.classList.remove('nav-open');
    }
  });
});

mainContent.addEventListener('click', () => {
  if (body.classList.contains('nav-open')) {
    menuButton.setAttribute('aria-expanded', 'false');

    // Animasi menutup drawer
    anime({
      targets: '#drawer',
      translateX: ['0%', '-100%'],
      duration: 500,
      easing: 'easeInExpo',
      complete: function () {
        body.classList.remove('nav-open');
      }
    });
  }
});

window.addEventListener('click', (event) => {
  if (!drawer.contains(event.target) && !menuButton.contains(event.target) && body.classList.contains('nav-open')) {
    menuButton.setAttribute('aria-expanded', 'false');

    // Animasi menutup drawer
    anime({
      targets: '#drawer',
      translateX: ['0%', '-100%'],
      duration: 500,
      easing: 'easeInExpo',
      complete: function () {
        body.classList.remove('nav-open');
      }
    });
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && body.classList.contains('nav-open')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();

    // Animasi menutup drawer
    anime({
      targets: '#drawer',
      translateX: ['0%', '-100%'],
      duration: 500,
      easing: 'easeInExpo',
      complete: function () {
        body.classList.remove('nav-open');
      }
    });
  }
});

// Animasi pada Hero Section saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
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
});

// Tambahkan event listener untuk scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

let restaurantsData = [];
const restaurantGridContainer = document.querySelector('.restaurant-grid');
const searchInput = document.querySelector('#search-input');
const cityFilter = document.querySelector('#city-filter');

fetch('data/DATA.json')
  .then((response) => response.json())
  .then((data) => {
    restaurantsData = data.restaurants;
    renderCityOptions(restaurantsData);
    renderFeaturedRestaurants(restaurantsData);
  })
  .catch((error) => {
    console.error('Error fetching restaurant data:', error);
  });

function renderCityOptions(restaurants) {
  const cities = [...new Set(restaurants.map((restaurant) => restaurant.city))];
  cities.sort();
  cities.forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });
}

function renderFeaturedRestaurants(restaurants) {
  restaurantGridContainer.innerHTML = '';
  if (restaurants.length === 0) {
    restaurantGridContainer.innerHTML = '<p>No restaurants found.</p>';
    return;
  }

  restaurants.forEach((restaurant) => {
    const restaurantItem = document.createElement('article');
    restaurantItem.classList.add('restaurant-item');
    restaurantItem.setAttribute('tabindex', '0');

    restaurantItem.innerHTML = `
      <img src="${restaurant.pictureId}" alt="${restaurant.name}">
      <div class="restaurant-info">
        <h4>${restaurant.name}</h4>
        <p><strong>City:</strong> ${restaurant.city}</p>
        <p><strong>Rating:</strong> ⭐${restaurant.rating}</p>
        <p>${restaurant.description.substring(0, 100)}...</p>
      </div>
    `;

    restaurantGridContainer.appendChild(restaurantItem);
  });

  // Tambahkan animasi setelah restoran dirender
  anime({
    targets: '.restaurant-item',
    opacity: [0, 1],
    translateY: [50, 0],
    delay: anime.stagger(100),
    duration: 800,
    easing: 'easeOutExpo',
  });
}

function filterRestaurants() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCity = cityFilter.value;
  const filteredRestaurants = restaurantsData.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchText);
    const matchesCity = selectedCity === '' || restaurant.city === selectedCity;
    return matchesSearch && matchesCity;
  });
  renderFeaturedRestaurants(filteredRestaurants);
}

searchInput.addEventListener('input', filterRestaurants);
cityFilter.addEventListener('change', filterRestaurants);
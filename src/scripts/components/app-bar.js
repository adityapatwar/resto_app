// src/scripts/components/app-bar.js

const createAppBar = () => `
  <header>
    <div class="container header-inner">
      <!-- Logo -->
      <div class="logo">
        <img src="images/logo.jpg" alt="RestoApp Logo" />
        <h1>RestoApp</h1>
      </div>
      <!-- Navigation Menu -->
      <nav class="nav-desktop" aria-label="Desktop Navigation">
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/favorite">Favorite</a></li>
          <li><a href="https://www.linkedin.com/in/aditya-f-789232192" target="_blank" rel="noopener noreferrer">About Us</a></li>
        </ul>
      </nav>
      <!-- Hamburger Menu -->
      <button id="menu" class="hamburger" aria-label="Open navigation menu" aria-expanded="false">&#9776;</button>
    </div>
    <!-- Navigation Drawer -->
    <nav id="drawer" class="nav-mobile" aria-label="Mobile Navigation">
      <div class="drawer-header">
        <div class="logo">
          <img src="images/logo.jpg" alt="RestoApp Logo" />
          <h1>RestoApp</h1>
        </div>
        <button id="close-button" class="close-button" aria-label="Close navigation menu">&times;</button>
      </div>
      <ul>
        <li><a href="#/">Home</a></li>
        <li><a href="#/favorite">Favorite</a></li>
        <li><a href="https://www.linkedin.com/in/aditya-f-789232192" target="_blank" rel="noopener noreferrer">About Us</a></li>
      </ul>
    </nav>
  </header>
`;

// Initialize App Bar functionality
const initAppBar = () => {
  const menuButton = document.getElementById('menu');
  const closeButton = document.getElementById('close-button');
  const drawer = document.getElementById('drawer');

  // Open the navigation drawer
  if (menuButton && drawer) {
    menuButton.addEventListener('click', () => {
      drawer.classList.add('open');
      menuButton.setAttribute('aria-expanded', 'true');
      // Prevent body from scrolling when drawer is open
      document.body.style.overflow = 'hidden';
    });
  }

  // Close the navigation drawer
  if (closeButton && drawer) {
    closeButton.addEventListener('click', () => {
      drawer.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      // Restore body scroll
      document.body.style.overflow = '';
    });
  }

  // Close the drawer when clicking outside of it
  document.addEventListener('click', (event) => {
    if (
      drawer.classList.contains('open') &&
      !drawer.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      drawer.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close the drawer with the Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuButton.focus();
    }
  });
};

export { createAppBar, initAppBar };

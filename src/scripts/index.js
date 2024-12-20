// src/scripts/index.js

import 'regenerator-runtime'; /* for async-await transpile */
import '../styles/main.scss';
import App from './views/app.js';
import { createAppBar, initAppBar } from './components/app-bar.js'; // Updated import

import createFooter from './components/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  appElement.innerHTML = `
    ${createAppBar()}
    <main id="main-content" tabindex="0"></main>
    ${createFooter()}
  `;

  // Initialize the App Bar functionality after rendering
  initAppBar();

  const app = new App({
    button: document.querySelector('#menu'),
    drawer: document.querySelector('#drawer'),
    content: document.querySelector('#main-content'),
  });

  app.renderPage();
});

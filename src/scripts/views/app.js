// src/scripts/views/app.js

import DrawerInitiator from '../utils/drawer-initiator.js';
import UrlParser from '../routes/url-parser.js';
import routes from '../routes/routes.js';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
    this._handleNavigation();
  }

  _initialAppShell() {
    // Initialize the drawer
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    // Add scroll event listener for header
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  _handleNavigation() {
    // Handle navigation events
    window.addEventListener('popstate', () => this.renderPage());

    // Delegate link clicks
    document.body.addEventListener('click', (event) => {
      const target = event.target.closest('a');
      if (target && target.href.startsWith(window.location.origin)) {
        const href = target.getAttribute('href');
        // Check if it's an internal link
        if (href.startsWith('/#')) {
          event.preventDefault();
          const url = new URL(target.href);
          history.pushState(null, '', url.pathname + url.hash);
          this.renderPage();
        }
      }
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    let page;
    if (url.resource === 'detail' && url.id) {
      page = routes['/detail'];
    } else {
      page = routes[`/${url.resource}`] || routes['/'];
    }

    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } else {
      this._content.innerHTML = '<h2>Page not found</h2>';
    }
  }
}

export default App;

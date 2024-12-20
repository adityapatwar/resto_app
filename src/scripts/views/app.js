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
        if (href.startsWith('/#') || href.startsWith('#/')) {
          event.preventDefault();
          history.pushState(null, '', href);
          this.renderPage();
        }
      }
    });
  }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      let page;
      if (url.resource === 'detail' && url.id) {
        page = routes['/detail'];
      } else {
        page = routes[`/${url.resource}`] || routes['/'];
      }
      if (page) {
        this._content.innerHTML = await page.render(url.id);
        await page.afterRender();
      } else {
        this._content.innerHTML = '<h2>Page not found</h2>';
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      this._content.innerHTML = '<h2>Error rendering page</h2>';
    }
  }
}

export default App;
import anime from 'animejs/lib/anime.es.js';

const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      this._toggleDrawer(drawer, button);
    });

    // Close drawer when clicking on content
    content.addEventListener('click', (event) => {
      if (drawer.classList.contains('open')) {
        this._closeDrawer(drawer, button);
      }
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (event) => {
      if (
        !drawer.contains(event.target) &&
        !button.contains(event.target) &&
        drawer.classList.contains('open')
      ) {
        this._closeDrawer(drawer, button);
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && drawer.classList.contains('open')) {
        this._closeDrawer(drawer, button);
      }
    });
  },

  _toggleDrawer(drawer, button) {
    const isDrawerOpen = drawer.classList.contains('open');
    button.setAttribute('aria-expanded', !isDrawerOpen);
    if (isDrawerOpen) {
      this._closeDrawer(drawer, button);
    } else {
      this._openDrawer(drawer, button);
    }
  },

  _openDrawer(drawer) {
    drawer.classList.add('open');
    anime({
      targets: drawer,
      translateX: ['-100%', '0%'],
      duration: 500,
      easing: 'easeOutExpo',
    });
  },

  _closeDrawer(drawer, button) {
    anime({
      targets: drawer,
      translateX: ['0%', '-100%'],
      duration: 500,
      easing: 'easeInExpo',
      complete: () => {
        drawer.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      },
    });
  },
};

export default DrawerInitiator;
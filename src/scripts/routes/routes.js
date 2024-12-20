import HomePage from '../views/pages/home-page.js';
import DetailPage from '../views/pages/detail-page.js';
import FavoritePage from '../views/pages/favorite-page.js';

const routes = {
  '/': HomePage,
  '/home': HomePage,
  '/detail': DetailPage,
  '/favorite': FavoritePage,
};

export default routes;
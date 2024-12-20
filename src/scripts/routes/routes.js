// src/scripts/routes/routes.js

import HomePage from '../views/pages/home-page.js';
import DetailPage from '../views/pages/detail-page.js';

const routes = {
  '/': HomePage,
  '/home': HomePage,
  '/detail': DetailPage,
};

export default routes;

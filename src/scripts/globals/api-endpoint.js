import CONFIG from './config.js';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  SEARCH: (query) => `${CONFIG.BASE_URL}/search?q=${encodeURIComponent(query)}`,
  REVIEW: `${CONFIG.BASE_URL}/review`,
  IMAGE: (size, pictureId) => CONFIG.IMAGE_URL(size, pictureId),
};

export default API_ENDPOINT;
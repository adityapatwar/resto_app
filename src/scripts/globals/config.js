const CONFIG = {
  BASE_URL: 'https://restaurant-api.dicoding.dev',
  IMAGE_URL(size, pictureId) {
    return `${this.BASE_URL}/images/${size}/${pictureId}`;
  },
  WEB_SOCKET_SERVER: 'wss://restaurant-api.dicoding.dev',
};

export default CONFIG;
const CONFIG = {
  BASE_URL: 'https://restaurant-api.dicoding.dev',
  IMAGE_URL(size, pictureId) {
    return `${this.BASE_URL}/images/${size}/${pictureId}`;
  },
  WEB_SOCKET_SERVER: 'wss://echo.websocket.org',
};

export default CONFIG;
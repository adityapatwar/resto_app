import ModalHelper from './modal-helper.js';

const WebSocketInitiator = {
  init() {
    this._checkInternetConnection();

    // Cek koneksi setiap 5 detik
    setInterval(() => {
      this._checkInternetConnection();
    }, 5000);
  },

  _checkInternetConnection() {
    if (navigator.onLine) {
      console.log('You are online');
    } else {
      console.log('You are offline');
      ModalHelper.showModal({
        title: 'Offline Mode',
        body: 'You are currently offline. Please check your internet connection.',
      });
    }
  },

  addFavorite() {
    if (navigator.onLine) {
      console.log('Favorite saved!');
      ModalHelper.showModal({
        title: 'Success',
        body: 'Your favorite has been saved successfully!',
      });
    } else {
      ModalHelper.showModal({
        title: 'Connection Error',
        body: 'Failed to save favorite. No internet connection.',
      });
    }
  },
};

export default WebSocketInitiator;

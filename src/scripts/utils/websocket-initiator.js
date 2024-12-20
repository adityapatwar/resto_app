import NotificationHelper from './notification-helper.js';
import CONFIG from '../globals/config.js';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler.bind(this);
  },
  _onMessageHandler(message) {
    const data = JSON.parse(message.data);
    NotificationHelper.sendNotification({
      title: `${data.title} is on resto!`,
      options: {
        body: data.overview,
        image: CONFIG.IMAGE_URL('large', data.pictureId),
      },
    });
  },
};

export default WebSocketInitiator;
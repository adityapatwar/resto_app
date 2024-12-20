import 'regenerator-runtime'; // Untuk mendukung async/await di browser lama
import '../styles/main.scss';
import '../styles/responsive.scss';
import App from './views/app.js';
import { createAppBar, initAppBar } from './components/app-bar.js';
import { createFooter } from './components/footer.js';
import swRegister from './utils/sw-register.js';
import WebSocketInitiator from './utils/websocket-initiator.js';
import CONFIG from './globals/config.js';

// Handle the 'Add to Home Screen' event
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Tampilkan tombol Add to Home Screen
  const addBtn = document.querySelector('#app-install');
  if (addBtn) {
    addBtn.style.display = 'block';
    addBtn.addEventListener('click', () => {
      addBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
  }
});

// Inisialisasi aplikasi setelah DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  appElement.innerHTML = `
    ${createAppBar()}
    <main id="main-content" tabindex="0"></main>
    ${createFooter()}
  `;
  // Inisialisasi fungsi App Bar setelah rendering
  initAppBar();
  // Inisialisasi dan render aplikasi
  const app = new App({
    button: document.querySelector('#menu'),
    drawer: document.querySelector('#drawer'),
    content: document.querySelector('#main-content'),
  });
  window.addEventListener('hashchange', () => {
    app.renderPage();
  });
  window.addEventListener('load', async () => {
    try {
      await swRegister(); // Daftarkan Service Worker
      WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER); // Inisialisasi WebSocket
      app.renderPage(); // Render halaman setelah semuanya siap
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  });
});
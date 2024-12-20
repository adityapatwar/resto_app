import anime from 'animejs/lib/anime.es.js';

const ModalHelper = {
  showModal({ title, body, imageUrl }) {
    // Cek apakah modal container sudah ada
    if (!document.getElementById('notification-modal')) {
      this._createModalContainer();
    }
    const modalContainer = document.getElementById('notification-modal');
    const modalContent = this._createModalContent({ title, body, imageUrl });
    modalContainer.innerHTML = '';
    modalContainer.appendChild(modalContent);
    modalContainer.style.display = 'block';
    // Animasi modal masuk
    anime({
      targets: modalContainer,
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutQuad',
    });
  },
  hideModal() {
    const modalContainer = document.getElementById('notification-modal');
    // Animasi modal keluar
    anime({
      targets: modalContainer,
      opacity: [1, 0],
      duration: 500,
      easing: 'easeOutQuad',
      complete: () => {
        modalContainer.style.display = 'none';
      },
    });
  },
  _createModalContainer() {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'notification-modal';
    modalContainer.classList.add('modal');
    document.body.appendChild(modalContainer);
  },
  _createModalContent({ title, body, imageUrl }) {
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    // Tambahkan konten modal
    modalContent.innerHTML = `
      <span class="close-button">&times;</span>
      <h2>${title}</h2>
      ${imageUrl ? `<img src="${imageUrl}" alt="${title}" />` : ''}
      <p>${body}</p>
    `;
    // Event listener untuk tombol close
    modalContent.querySelector('.close-button').addEventListener('click', () => {
      this.hideModal();
    });
    return modalContent;
  },
};

export default ModalHelper;
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalTargetImg');
  const closeBtn = document.querySelector('.modal-close-btn');
  const galleryImages = document.querySelectorAll('.gallery-image-wrapper img');

  // 1. Open the full-screen window when clicking any photo
  galleryImages.forEach(img => {
    img.style.cursor = 'pointer'; // Makes it obvious that images are clickable
    
    img.addEventListener('click', () => {
      if (!modal || !modalImg) return;
      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      document.body.style.overflow = 'hidden'; // Lock background page scrolling
    });
  });

  // 2. Close window when clicking the "X" button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  // 3. Close window when clicking anywhere on the dark background
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // 4. Close window when pressing the Escape link key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable normal scrolling
  }
});
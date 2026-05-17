// JS UNTUK PAST EVENTS.PAGE
window.addEventListener('resize', () => {
  const mobileNavPanel = document.getElementById('mobileNav');
  if (mobileNavPanel && window.innerWidth > 768) {
    mobileNavPanel.classList.remove('open');
  }
});

// Smoothly scroll down to sections when nav anchors are clicked
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
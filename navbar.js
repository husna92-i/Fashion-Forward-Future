// ni yang buat dia stay and ubah warna
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Search overlay
const searchBtn     = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose   = document.getElementById('searchClose');
const searchInput   = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
  searchOverlay.classList.add('active');
  setTimeout(() => searchInput.focus(), 300);
});

searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));

searchOverlay.addEventListener('click', (e) => {
  if (e.target === searchOverlay) searchOverlay.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') searchOverlay.classList.remove('active');
});

// Search tags
document.querySelectorAll('.search-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    searchInput.value = tag.textContent;
    searchInput.focus();
  });
});

// Hamburger menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNav    = document.getElementById('mobileNav');

hamburgerBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// Close mobile nav when clicking on a section link (for smooth scrolling)
document.querySelectorAll('.mobile-nav a, .nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
    }
  });
});

// weh ni yang kalau scroll di akan berubah warna, but for navlink lah

function setActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  
  if (sections.length === 0) return;
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (href === `#${current}`) {
        link.style.color = '#500224';
        link.style.fontWeight = 'bold';
      } else {
        link.style.color = '#700143';
        link.style.fontWeight = '500';
      }
    });
  });
}

// Initialize active nav highlighting-ahoi

if (document.querySelectorAll('section[id]').length > 0) {
  setActiveNavOnScroll();
}
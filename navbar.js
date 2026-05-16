// =========================================================================
//               FASHION FORWARD FUTURE - NAVIGATION & ROUTING
// =========================================================================

// 1. NAVBAR BACKGROUND SCROLL EFFECT
// Changes the navbar background color styling slightly once the user scrolls down
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// 2. SEARCH OVERLAY CONFIGURATION
// Handles opening, closing, and focusing the search interface window panel
const searchBtn     = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose   = document.getElementById('searchClose');
const searchInput   = document.getElementById('searchInput');
const searchSubmit  = document.querySelector('.search-bar button');

if (searchBtn && searchOverlay) {
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
}

// Inspects text keywords and redirects the window location to matching HTML sub-pages
function handleSearchRouting(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  if (term === '') return;

  if (term.includes('volunteer') || term.includes('crew') || term.includes('portfolio')) {
    window.location.href = 'Volunteer.html';
  } else if (term.includes('contact')) {
    window.location.href = 'contact.html';
  } else if (term.includes('newsletter') || term.includes('subscribe')) {
    window.location.href = 'Newsletter.html';
  } else if (term.includes('gallery')) {
    window.location.href = 'Gallery.html';
  } else if (term.includes('about') || term.includes('b40')) {
    window.location.href = 'index.html#about';
  } else if (term.includes('home') || term.includes('event') || term.includes('fashion')) {
    window.location.href = 'index.html#home';
  } else {
    alert(`No structural page found matching "${searchTerm}". Try clicking one of the suggested tags.`);
  }
}

// Bind Routing Engine to Interactive Search Tags Click
document.querySelectorAll('.search-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const chosenTag = tag.textContent;
    if (searchInput) searchInput.value = chosenTag;
    
    // Smooth delay so the user physically sees the tag text fill the bar before navigation redirects
    setTimeout(() => {
      handleSearchRouting(chosenTag);
    }, 200);
  });
});

// Bind Routing Engine to the Search Button Click inside overlay bar
if (searchSubmit && searchInput) {
  searchSubmit.addEventListener('click', () => {
    handleSearchRouting(searchInput.value);
  });
}

// Bind Routing Engine to pressing 'Enter' inside the text Input box
if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSearchRouting(searchInput.value);
    }
  });
}

// 4. HAMBURGER MOBILE MENU RULES
// Toggles visibility of mobile side menu overlay panel
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNav    = document.getElementById('mobileNav');

if (hamburgerBtn && mobileNav) {
  hamburgerBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

// Close mobile nav panel when clicking on any anchor section navigation link
document.querySelectorAll('.mobile-nav a, .nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
    }
  });
});

// 5. SCROLL HIGHLIGHT DETECTOR (Scroll-Spy)
// Highlights navbar links dynamically based on the current visible screen section
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

// Safely execute scroll highlighter if tracking anchors match sections on the current page
if (document.querySelectorAll('section[id]').length > 0) {
  setActiveNavOnScroll();
}

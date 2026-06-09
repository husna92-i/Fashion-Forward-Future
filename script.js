// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');

if (hamburgerBtn && mobileNav) {
  hamburgerBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

// Search overlay
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');

if (searchBtn && searchOverlay) {
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput?.focus(), 300);
  });

  searchClose?.addEventListener('click', () => searchOverlay.classList.remove('active'));

  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay.classList.remove('active');
  });

  // Search tags
  document.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = tag.textContent;
        searchInput.focus();
      }
    });
  });
}

// Looping Typewriter Effect
const text = 'Wear the <em>change</em><br/>you want to see';
let index = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const typewriterElement = document.querySelector('.typewriter-text');
    
    if (!typewriterElement) return;
    
    if (isDeleting) {
        let currentText = text.substring(0, index - 1);
        typewriterElement.innerHTML = currentText;
        index--;
        typeSpeed = 50;
    } else {
        let currentText = text.substring(0, index + 1);
        typewriterElement.innerHTML = currentText;
        index++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && index === text.length) {
        isDeleting = true;
        typeSpeed = 2000;
    }
    
    if (isDeleting && index === 0) {
        isDeleting = false;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeWriter);

// Close mobile nav when clicking on a section link
document.querySelectorAll('.mobile-nav a, .nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
    }
  });
});

// Active navigation highlight based on scroll position
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

// Initialize active nav highlighting
if (document.querySelectorAll('section[id]').length > 0) {
  setActiveNavOnScroll();
}

// =========================================================================
//========= CENTRALIZED SEARCH ROUTING ENGINE ONLY  ===========
// =========================================================================

// Select search-specific elements from the DOM

const searchSubmit  = document.querySelector('.search-bar button');

/**
 * Inspects text keywords and redirects the window location to matching HTML sub-pages
 * @param {string} searchTerm - The string inputted by the user or text from a clicked tag
 */
function handleSearchRouting(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  if (term === '') return;

  if (term.includes('volunteer') || term.includes('crew')) {
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

// =========================================================================
// GOOGLE ANALYTICS EVENT TRACKING
// =========================================================================

// Helper function to safely track events
function trackEvent(eventName, eventData = {}) {
  if (window.logEvent && window.analytics) {
    window.logEvent(window.analytics, eventName, eventData);
  }
}

// Track volunteer sign-ups
const volunteerBtns = document.querySelectorAll('.btn-primary, .glass-btn');
volunteerBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (btn.getAttribute('href')?.includes('Volunteer')) {
      trackEvent('volunteer_signup_click', {
        source: btn.className,
        text: btn.textContent.trim()
      });
    }
  });
});

// Track navigation clicks
const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
allNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    trackEvent('navigation_click', {
      destination: href,
      from: 'navigation'
    });
  });
});

// Track gallery visits
document.querySelectorAll('a[href*="Gallery"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('gallery_click', {
      source: 'navigation'
    });
  });
});

// Track social media clicks
document.querySelectorAll('.social-icon').forEach(link => {
  link.addEventListener('click', () => {
    const platform = link.querySelector('img')?.alt || 'unknown';
    trackEvent('social_media_click', {
      platform: platform
    });
  });
});

// Track search interactions
if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      trackEvent('search_performed', {
        search_term: searchInput.value
      });
    }
  });
}

// Track search tag clicks
document.querySelectorAll('.search-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    trackEvent('search_tag_click', {
      tag: tag.textContent
    });
  });
});

// Track section scrolling
let trackedSections = new Set();
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionId = section.getAttribute('id');
    
    // Track when section comes into view (and hasn't been tracked yet)
    if (rect.top < window.innerHeight && rect.bottom > 0 && !trackedSections.has(sectionId)) {
      trackedSections.add(sectionId);
      trackEvent('section_viewed', {
        section: sectionId
      });
    }
  });
});

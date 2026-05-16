
// =========================================================================
//                      FASHION FORWARD FUTURE - CORE SCRIPT
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. NAVBAR BACKGROUND SCROLL EFFECT ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // --- 2. SEARCH OVERLAY & INTERACTIVE TAGS ---
  const searchBtn     = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose   = document.getElementById('searchClose');
  const searchInput   = document.getElementById('searchInput');

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

    document.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        searchInput.value = tag.textContent;
        searchInput.focus();
      });
    });
  }

  // --- 3. HAMBURGER MENU & MOBILE LINK CLOSING RULES ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav    = document.getElementById('mobileNav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav a, .nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  // --- 4. VOLUNTEER FORM SUBMISSION & SUCCESS MODAL POPUP ---
  const volunteerForm = document.querySelector('.volunteer-form');
  const successModal  = document.getElementById('successModal');
  const modalHomeBtn  = document.getElementById('modalHomeBtn');

  if (volunteerForm && successModal) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop default browser reload processing loops

      const submitBtn = volunteerForm.querySelector('.volunteer-submit-btn');
      submitBtn.textContent = 'SUBMITTING...';
      submitBtn.disabled = true;

      // Simulate submission network delay (1 second)
      setTimeout(() => {
        // 1. Open the beautiful purple notification modal smoothly!
        successModal.classList.add('show-modal');
        
        // 2. Wipe the input text fields in the background
        volunteerForm.reset();
        
        // 3. Reset the submit button back to normal
        submitBtn.textContent = 'BECOME VOLUNTEER';
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  // Custom modal click listener to forward users back to the landing page
  if (modalHomeBtn) {
    modalHomeBtn.addEventListener('click', () => {
      window.location.href = 'index.html'; // Points directly to your homepage
    });
  }

  // --- 5. SCROLL HIGHLIGHT DETECTOR (Scroll-Spy) ---
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
      
      // Safety Guard Fix: Only change navbar link colors if a matching active section ID exists
      if (current) {
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
      }
    });
  }

  // Initialize scroll highligher if sections are present
  if (document.querySelectorAll('section[id]').length > 0) {
    setActiveNavOnScroll();
  }

});
// =========================================================================
//                   FIREBASE INITIALIZATION & CONFIGURATION
// =========================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7ax-Re_pr2mRJFAbLiFCLnHUOU8Babtk",
    authDomain: "fashionforwardfuture-20fa7.firebaseapp.com",
    projectId: "fashionforwardfuture-20fa7",
    storageBucket: "fashionforwardfuture-20fa7.firebasestorage.app",
    messagingSenderId: "1487409101",
    appId: "1:1487409101:web:8b18e370806221a0d7be84"
};

// Initialize Firebase and Firestore database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================================================================
//                     DOM CONTENT LOADED EVENT
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

  // --- 4. VOLUNTEER FORM SUBMISSION & FIREBASE + EMAILJS INTEGRATION ---
  const volunteerForm = document.querySelector('.volunteer-form');

  if (volunteerForm) {
    volunteerForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevents the browser from reloading the page

      // Get the input values from the form IDs
      const volunteerName = document.getElementById("volunteer-name").value;
      const volunteerEmail = document.getElementById("volunteer-email").value;
      const volunteerPortfolio = document.getElementById("volunteer-portfolio").value;
      
      // Formatting fallback string and submission timestamp for readability
      const portfolioContent = volunteerPortfolio || "No portfolio provided";
      const submissionTimeStr = new Date().toLocaleString();

      // Simple visual feedback on the button
      const submitBtn = volunteerForm.querySelector(".volunteer-submit-btn");
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "SUBMITTING...";
      submitBtn.disabled = true;

      try {
        // A. Add a new document with a generated ID to Firestore "volunteers" collection
        const docRef = await addDoc(collection(db, "volunteers"), {
          name: volunteerName,
          email: volunteerEmail,
          portfolio: portfolioContent,
          submittedAt: new Date()
        });

        console.log("Document successfully written with ID: ", docRef.id);

        // B. EmailJS integration workflow
        const emailParams = {
          volunteer_name: volunteerName,
          volunteer_email: volunteerEmail,
          volunteer_portfolio: portfolioContent,
          submission_time: submissionTimeStr
        };

        // Sends data to your EmailJS Dashboard using your account credentials
        await emailjs.send('service_i0yt9mb', 'template_updbgkn', emailParams);

        alert("Thank you for applying! Your details have been submitted and email notification sent.");

        // Clear the form input fields
        volunteerForm.reset();
      } catch (error) {
        console.error("Error during form submission process: ", error);
        alert("Something went wrong. Please try again later.");
      } finally {
        // Restore the button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
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

  // Initialize scroll highlighter if sections are present
  if (document.querySelectorAll('section[id]').length > 0) {
    setActiveNavOnScroll();
  }

});

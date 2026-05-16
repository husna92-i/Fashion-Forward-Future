
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the page from reloading instantly

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    
    if (!emailInput || !submitBtn) return;

    const emailValue = emailInput.value.trim();

    // 1. Basic validation check
    if (emailValue === '') {
      alert('Please enter a valid email address!');
      return;
    }

    // 2. Set loading state on the button
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'SUBSCRIBING...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // 3. Simulate network response delay (1.2 seconds)
    setTimeout(() => {
      // Create a beautiful custom success message container dynamically
      const successMessage = document.createElement('div');
      successMessage.className = 'newsletter-success-msg';
      successMessage.innerHTML = `
        <span style="font-size: 1.2rem; margin-right: 8px;">✓</span> 
        Welcome to the movement! <strong>${emailValue}</strong> has been successfully subscribed to our newsletter.
      `;

      // Apply quick elegant styles right to the message box
      successMessage.style.color = '#500224'; // Your signature deep plum color
      successMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
      successMessage.style.padding = '12px 20px';
      successMessage.style.borderRadius = '8px';
      successMessage.style.marginTop = '15px';
      successMessage.style.fontSize = '1rem';
      successMessage.style.fontWeight = '500';
      successMessage.style.textAlign = 'center';
      successMessage.style.border = '1px solid rgba(255, 255, 255, 0.5)';
      successMessage.style.animation = 'fadeInUp 0.4s ease forwards';

      // Remove any old success messages if they click twice
      const existingMsg = newsletterForm.parentNode.querySelector('.newsletter-success-msg');
      if (existingMsg) existingMsg.remove();

      // Append the clean success confirmation directly under the newsletter form card
      newsletterForm.parentNode.appendChild(successMessage);

      // 4. Reset the form input and button back to default states
      newsletterForm.reset();
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';

    }, 1200);
  });
}
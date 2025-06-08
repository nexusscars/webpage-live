// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  
  menuToggle.addEventListener('click', function() {
    primaryNav.classList.toggle('active');
    this.setAttribute('aria-expanded', primaryNav.classList.contains('active'));
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (primaryNav.classList.contains('active')) {
          primaryNav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
  
  // Modal functionality
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const captionText = document.getElementById('caption');
  
  function openModal(imgElement) {
    modal.classList.add('show');
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
  
  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  // Attach click events to all car images
  document.querySelectorAll('.car-card img').forEach(img => {
    img.addEventListener('click', function() {
      openModal(this);
    });
  });
  
  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const alertBox = document.getElementById('form-alert');
      
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          alertBox.className = 'form-alert success';
          alertBox.innerText = "Thank you! Your inquiry has been sent successfully.";
          form.reset();
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        alertBox.className = 'form-alert error';
        alertBox.innerText = "Oops! Something went wrong. Please try again.";
      }
      
      alertBox.style.display = 'block';
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 6000);
    });
  }
});
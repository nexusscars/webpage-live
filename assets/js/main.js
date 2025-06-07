 (function($) {
  // Breakpoints initialization
  breakpoints({
    default: ['1681px', null],
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: ['361px', '480px'],
    xxsmall: [null, '360px']
  });

  // Remove preload class
  $(window).on('load', function() {
    setTimeout(function() {
      $('body').removeClass('is-preload');
    }, 100);
  });

  // Mobile menu toggle
  $('.mobile-menu-toggle').on('click', function() {
    $('.primary-nav').toggleClass('active');
  });

  // Smooth scrolling
  $('a[href*="#"]').not('[href="#"]').on('click', function(e) {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && 
        location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 500);
      }
    }
  });
// VIEWPORT UNIT FIX (for mobile browsers)
function setViewportUnits() {
  document.documentElement.style.setProperty(
    '--vh', 
    `${window.innerHeight * 0.01}px`
  );
  document.documentElement.style.setProperty(
    '--scrollbar-width', 
    `${window.innerWidth - document.documentElement.clientWidth}px`
  );
}

// Initialize and update on resize
window.addEventListener('load', setViewportUnits);
window.addEventListener('resize', debounce(setViewportUnits, 100));

// Optional: Debounce helper (add if not present)
function debounce(fn, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}
  // Modal functionality
  window.openModal = function(imgElement) {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modal-img");
    var captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
  };

  window.closeModal = function() {
    document.getElementById("modal").style.display = "none";
  };

  // Chrome extension message handler (fixed)
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    chrome.runtime.sendMessage({type: 'init'}, function(response) {
      if (chrome.runtime.lastError) {
        console.warn('Extension error:', chrome.runtime.lastError);
      } else {
        // Handle response
      }
    });
  }

  // Close modal when clicking outside
  document.addEventListener('click', function(e) {
    var modal = document.getElementById('modal');
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
// Initialize viewport units
function initViewportUnits() {
  document.documentElement.style.setProperty(
    '--vh', 
    `${window.innerHeight * 0.01}px`
  );
  document.documentElement.style.setProperty(
    '--scrollbar-width', 
    `${window.innerWidth - document.documentElement.clientWidth}px`
  );
}

window.addEventListener('load', initViewportUnits);
window.addEventListener('resize', initViewportUnits);
})(jQuery);


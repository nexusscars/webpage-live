 (function($) {

	// Breakpoints.
	breakpoints({
		default:   ['1681px',   null       ],
		xlarge:    ['1281px',   '1680px'   ],
		large:     ['981px',    '1280px'   ],
		medium:    ['737px',    '980px'    ],
		small:     ['481px',    '736px'    ],
		xsmall:    ['361px',    '480px'    ],
		xxsmall:   [null,       '360px'    ]
	});

	// Remove preload class on page load
	$(window).on('load', function() {
		setTimeout(function() {
			$('body').removeClass('is-preload');
		}, 100);
	});

	// Mobile Menu Toggle
	$('.mobile-menu-toggle').on('click', function() {
		$('.primary-nav').toggleClass('active');
		$(this).toggleClass('active');
	});

	// Close mobile menu when clicking a link
	$('.primary-nav .nav-link').on('click', function() {
		if ($(window).width() < 737) { // Medium breakpoint
			$('.primary-nav').removeClass('active');
			$('.mobile-menu-toggle').removeClass('active');
		}
	});

	// Your Custom Modal Functions
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

	// Close modal when clicking outside image
	document.getElementById('modal').addEventListener('click', function(e) {
		if (e.target === this) {
			closeModal();
		}
	});

	// Close modal with ESC key
	document.addEventListener('keydown', function(e) {
		if (e.key === "Escape") {
			closeModal();
		}
	});

	// Smooth scrolling for anchor links
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
// Initialize tabs with default active tab
document.addEventListener('DOMContentLoaded', () => {
  const tabs = new Tabs({
    defaultTab: 0 // Force first tab as active
  });
chrome.runtime.sendMessage({...}, (response) => {
  if (chrome.runtime.lastError) {
    console.warn('Extension error:', chrome.runtime.lastError);
  });
})(jQuery);


// Initialize Lightbox with proper closing behavior
document.addEventListener('DOMContentLoaded', function() {
    lightbox.option({
        'alwaysShowNavOnTouchDevices': true,
        'wrapAround': true,
        'disableScrolling': true,
        'fitImagesInViewport': true,
        'albumLabel': 'Image %1 of %2'
    });

    // Enhanced closing handlers
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const lightbox = document.getElementById('lightbox');
            if (lightbox) lightbox.style.display = 'none';
        }
        // Initialize with error handling
if (typeof lightbox !== 'undefined') {
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'alwaysShowNavOnTouchDevices': true,
    'onError': function(err) {
      console.error('Lightbox error:', err);
      // Fallback: Open image in new tab
      window.open(this.$element[0].href, '_blank');
    }
  });
} else {
  console.error('Lightbox2 not loaded! Check script order.');
}
    });
});

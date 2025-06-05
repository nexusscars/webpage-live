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
    });
});

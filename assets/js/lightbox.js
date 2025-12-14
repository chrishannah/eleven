function initLightbox() {
    // Add click listeners to all images except profile images and icons
    const images = document.querySelectorAll('img:not(.u-photo):not([width="24"]):not([height="24"]), img.hero');

    // Single keydown handler for all lightboxes
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            const lightbox = document.querySelector('.lightbox');
            if (lightbox) {
                lightbox.remove();
                document.body.classList.remove('lightbox-open');
            }
        }
    }

    // Add keyboard listener once
    document.addEventListener('keydown', handleEscapeKey);

    images.forEach(img => {
        // Make images clickable with a pointer cursor
        img.style.cursor = 'pointer';

        img.addEventListener('click', function(e) {
            e.preventDefault();

            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';

            const lightboxImg = document.createElement('img');
            lightboxImg.className = 'lightbox-image';

            // Add loading indicator
            lightbox.innerHTML = '<div class="loading">Loading...</div>';
            document.body.appendChild(lightbox);

            // Load the image
            lightboxImg.onload = function() {
                lightbox.innerHTML = ''; // Clear loading indicator
                lightbox.appendChild(lightboxImg);
            };

            // Set image source after setting up onload
            lightboxImg.src = this.src;

            // Add close functionality
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    this.remove();
                    document.body.classList.remove('lightbox-open');
                }
            });

            // Add to DOM and apply blur
            document.body.classList.add('lightbox-open');
        });
    });
}

// Initialize lightbox if document is already loaded
if (document.readyState === 'complete') {
    initLightbox();
}

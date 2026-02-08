// Live Activity - Fetches dynamic data for the homepage
(function() {
    'use strict';

    // Read page views from Tinylytics embed script (injected via tinylytics_hits element)
    function readTinylyticsHits() {
        var el = document.getElementById('page-views');
        if (!el) return;

        var hitsEl = document.querySelector('.tinylytics_hits');
        if (hitsEl && hitsEl.textContent.trim()) {
            el.textContent = hitsEl.textContent.trim();
        }
    }

    // Compute relative time for last deploy
    function updateLastDeploy() {
        var el = document.getElementById('last-deploy');
        if (!el) return;

        var timestamp = el.getAttribute('data-timestamp');
        if (!timestamp) return;

        var deployDate = new Date(timestamp);
        var now = new Date();
        var diffMs = now - deployDate;
        var diffSec = Math.floor(diffMs / 1000);
        var diffMin = Math.floor(diffSec / 60);
        var diffHr = Math.floor(diffMin / 60);
        var diffDay = Math.floor(diffHr / 24);

        var relative;
        if (diffDay > 0) {
            relative = diffDay + 'd ago';
        } else if (diffHr > 0) {
            relative = diffHr + 'h ago';
        } else if (diffMin > 0) {
            relative = diffMin + 'm ago';
        } else {
            relative = 'just now';
        }

        el.textContent = relative;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        updateLastDeploy();

        // Tinylytics embed loads async — poll for its DOM elements
        var attempts = 0;
        var interval = setInterval(function() {
            attempts++;
            var hitsEl = document.querySelector('.tinylytics_hits');
            if ((hitsEl && hitsEl.textContent.trim()) || attempts > 20) {
                readTinylyticsHits();
                clearInterval(interval);
            }
        }, 500);
    }
})();

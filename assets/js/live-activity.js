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

    // Fetch GitHub commits from the last 7 days
    function fetchGitHubCommits() {
        var el = document.getElementById('github-commits');
        if (!el) return;

        fetch('https://api.github.com/users/chrishannah/events/public?per_page=100')
            .then(function(response) {
                if (!response.ok) return null;
                return response.json();
            })
            .then(function(events) {
                if (!events) return;

                var oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

                var commitCount = 0;
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    if (event.type === 'PushEvent') {
                        var eventDate = new Date(event.created_at);
                        if (eventDate >= oneWeekAgo) {
                            commitCount += event.payload.commits ? event.payload.commits.length : 0;
                        }
                    }
                }

                el.textContent = commitCount + ' commits/wk';
            })
            .catch(function() {
                // Leave the default "--" on failure
            });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        updateLastDeploy();
        fetchGitHubCommits();

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

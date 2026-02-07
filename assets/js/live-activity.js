// Live Activity - Fetches dynamic data for the homepage
(function() {
    'use strict';

    // GitHub username
    const GITHUB_USERNAME = 'chrishannah';

    // Tinylytics
    const TINYLYTICS_API = 'https://tinylytics.app/api/v1';
    const TINYLYTICS_SITE_ID = 'e7KoNsv_jq9FizddEYyk';
    const TINYLYTICS_KEY = 'tly-ro-G5P6UGCqDbUEtgBbe7Nrt3asq0TrknlG';

    // Fetch GitHub commits this week
    async function fetchGitHubActivity() {
        const commitsEl = document.getElementById('github-commits');
        if (!commitsEl) return;

        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`);
            if (!response.ok) throw new Error('GitHub API error');

            const events = await response.json();

            // Count push events from the last 7 days
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            let commitCount = 0;
            events.forEach(event => {
                if (event.type === 'PushEvent') {
                    const eventDate = new Date(event.created_at);
                    if (eventDate >= oneWeekAgo) {
                        commitCount += event.payload.commits ? event.payload.commits.length : 0;
                    }
                }
            });

            commitsEl.textContent = commitCount > 0 ? `${commitCount} commits/wk` : '0 commits/wk';
        } catch (error) {
            console.log('GitHub activity fetch failed:', error);
            commitsEl.textContent = '--';
        }
    }

    // Fetch page views today from Tinylytics
    async function fetchPageViews() {
        const el = document.getElementById('page-views');
        if (!el) return;

        try {
            const today = new Date().toISOString().split('T')[0];
            const response = await fetch(
                `${TINYLYTICS_API}/sites/${TINYLYTICS_SITE_ID}/hits?start_date=${today}&end_date=${today}&grouped=true`,
                { headers: { 'Authorization': `Bearer ${TINYLYTICS_KEY}` } }
            );
            if (!response.ok) throw new Error('Tinylytics API error');

            const data = await response.json();
            const total = Array.isArray(data) ? data.reduce((sum, d) => sum + (d.count || 0), 0) : 0;
            el.textContent = `${total} today`;
        } catch (error) {
            console.log('Page views fetch failed:', error);
            el.textContent = '--';
        }
    }

    // Fetch lifetime kudos from Tinylytics
    async function fetchKudos() {
        const el = document.getElementById('kudos-week');
        if (!el) return;

        try {
            const response = await fetch(
                `${TINYLYTICS_API}/sites/${TINYLYTICS_SITE_ID}`,
                { headers: { 'Authorization': `Bearer ${TINYLYTICS_KEY}` } }
            );
            if (!response.ok) throw new Error('Tinylytics API error');

            const data = await response.json();
            el.textContent = data.lifetime_kudos != null ? data.lifetime_kudos : '--';
        } catch (error) {
            console.log('Kudos fetch failed:', error);
            el.textContent = '--';
        }
    }

    // Compute relative time for last deploy
    function updateLastDeploy() {
        const el = document.getElementById('last-deploy');
        if (!el) return;

        const timestamp = el.getAttribute('data-timestamp');
        if (!timestamp) return;

        const deployDate = new Date(timestamp);
        const now = new Date();
        const diffMs = now - deployDate;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);

        let relative;
        if (diffDay > 0) {
            relative = `${diffDay}d ago`;
        } else if (diffHr > 0) {
            relative = `${diffHr}h ago`;
        } else if (diffMin > 0) {
            relative = `${diffMin}m ago`;
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
        fetchGitHubActivity();
        fetchPageViews();
        fetchKudos();
        updateLastDeploy();
    }
})();

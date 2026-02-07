// Live Activity - Fetches dynamic data for the homepage
(function() {
    'use strict';

    // GitHub username
    const GITHUB_USERNAME = 'chrishannah';

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

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        fetchGitHubActivity();
    }
})();

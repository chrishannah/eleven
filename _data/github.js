export default async function () {
    const username = 'chrishannah';
    const url = `https://api.github.com/users/${username}/events/public?per_page=100`;
    const maxRetries = 3;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);

            // If rate limited, wait and retry
            if (response.status === 403 && attempt < maxRetries) {
                const retryAfter = response.headers.get('retry-after');
                const waitMs = retryAfter ? parseInt(retryAfter) * 1000 : 2000 * (attempt + 1);
                await new Promise(resolve => setTimeout(resolve, waitMs));
                continue;
            }

            if (!response.ok) return { commitsThisWeek: null };

            const events = await response.json();

            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            let commitCount = 0;
            for (const event of events) {
                if (event.type === 'PushEvent') {
                    const eventDate = new Date(event.created_at);
                    if (eventDate >= oneWeekAgo) {
                        commitCount += event.payload.commits ? event.payload.commits.length : 0;
                    }
                }
            }

            return { commitsThisWeek: commitCount };
        } catch (error) {
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
                continue;
            }
            console.log('GitHub data fetch failed:', error.message);
            return { commitsThisWeek: null };
        }
    }

    return { commitsThisWeek: null };
}

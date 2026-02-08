export default async function () {
    const username = 'chrishannah';

    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/events/public?per_page=100`
        );
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
        console.log('GitHub data fetch failed:', error.message);
        return { commitsThisWeek: null };
    }
}

// Instagram data fetcher using Behold.so
// To enable: Add your Behold.so Feed ID to homepage.json under instagram.feedId

export default async function() {
    // Read the feed ID from homepage.json (loaded as part of Eleventy's data cascade)
    // We need to import the homepage data to get the feed ID
    const fs = await import('fs');
    const path = await import('path');

    let feedId = '';

    try {
        const homepagePath = path.join(process.cwd(), '_data', 'homepage.json');
        const homepageData = JSON.parse(fs.readFileSync(homepagePath, 'utf8'));
        feedId = homepageData?.instagram?.feedId || '';
    } catch (e) {
        console.log('Could not read homepage.json for Instagram feed ID');
    }

    // If no feed ID configured, return placeholder data
    if (!feedId) {
        return {
            imageUrl: null,
            permalink: null,
            timestamp: null,
            caption: null,
            colorPalette: null,
            configured: false
        };
    }

    // Try to fetch from Behold.so
    try {
        // Dynamic import for eleventy-fetch (may not be installed)
        let EleventyFetch;
        try {
            const fetchModule = await import('@11ty/eleventy-fetch');
            EleventyFetch = fetchModule.default;
        } catch (e) {
            console.log('eleventy-fetch not installed. Run: npm install @11ty/eleventy-fetch');
            return {
                imageUrl: null,
                permalink: null,
                timestamp: null,
                caption: null,
                colorPalette: null,
                configured: true,
                error: 'eleventy-fetch not installed'
            };
        }

        const url = `https://feeds.behold.so/${feedId}`;

        const data = await EleventyFetch(url, {
            duration: '1h', // Cache for 1 hour
            type: 'json'
        });

        // Behold.so returns { posts: [...] }
        const posts = data?.posts || data;
        if (posts && posts.length > 0) {
            const latestPost = posts[0];
            // Prefer stable Behold-hosted URLs over expiring CDN URLs
            const imageUrl = latestPost.sizes?.medium?.mediaUrl
                || latestPost.sizes?.small?.mediaUrl
                || latestPost.mediaUrl
                || latestPost.thumbnailUrl;
            return {
                imageUrl,
                permalink: latestPost.permalink,
                timestamp: latestPost.timestamp,
                caption: latestPost.caption || latestPost.prunedCaption,
                colorPalette: latestPost.colorPalette || null,
                configured: true
            };
        }

        return {
            imageUrl: null,
            permalink: null,
            timestamp: null,
            caption: null,
            colorPalette: null,
            configured: true,
            error: 'No posts found'
        };

    } catch (error) {
        console.log('Instagram fetch error:', error.message);
        return {
            imageUrl: null,
            permalink: null,
            timestamp: null,
            caption: null,
            colorPalette: null,
            configured: true,
            error: error.message
        };
    }
}

import moment from "moment";

const statsFilters = {
    // Calculate days since blog started
    daysPublishing: (startYear) => {
        const startDate = moment(`${startYear}-08-01`); // Assuming started in August
        const now = moment();
        return now.diff(startDate, 'days');
    },

    // Count posts in current month
    postsThisMonth: (collection) => {
        const now = moment();
        const currentMonth = now.month();
        const currentYear = now.year();

        return collection.filter(post => {
            const postDate = moment(post.date || post.data?.date);
            return postDate.month() === currentMonth && postDate.year() === currentYear;
        }).length;
    },

    // Count posts in current year
    postsThisYear: (collection) => {
        const currentYear = moment().year();

        return collection.filter(post => {
            const postDate = moment(post.date || post.data?.date);
            return postDate.year() === currentYear;
        }).length;
    },

    // Get relative time since last post
    daysSinceLastPost: (collection) => {
        if (!collection || collection.length === 0) return "No posts";

        // Collection is typically in chronological order, get last item
        const sortedCollection = [...collection].sort((a, b) => {
            const dateA = new Date(a.date || a.data?.date);
            const dateB = new Date(b.date || b.data?.date);
            return dateB - dateA;
        });

        const lastPost = sortedCollection[0];
        const lastPostDate = moment(lastPost.date || lastPost.data?.date);
        return lastPostDate.fromNow();
    },

    // Convert years blogging to Roman numeral (volume number)
    volumeNumber: (startYear) => {
        const currentYear = moment().year();
        const yearsPublishing = currentYear - startYear + 1;

        const romanNumerals = [
            '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
            'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'
        ];

        if (yearsPublishing > 0 && yearsPublishing < romanNumerals.length) {
            return romanNumerals[yearsPublishing];
        }
        return yearsPublishing.toString();
    },

    // Format number with commas (thousands separator)
    thousands: (num) => {
        if (num === undefined || num === null) return '0';
        return num.toLocaleString('en-US');
    },

    // Next "nice" round number milestone above the collection length
    nextMilestone: (collection) => {
        if (!collection) return 0;
        const count = collection.length;
        const milestones = [10, 25, 50, 75, 100, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 5000, 10000];
        for (const m of milestones) {
            if (m > count) return m;
        }
        return Math.ceil(count / 1000) * 1000 + 1000;
    },

    // Longest run of consecutive calendar days with at least one post
    longestStreak: (collection) => {
        if (!collection || collection.length === 0) return 0;

        const dates = new Set();
        collection.forEach(post => {
            const d = new Date(post.date || post.data?.date);
            if (!isNaN(d)) {
                dates.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
            }
        });

        const sorted = [...dates].sort();
        if (sorted.length === 0) return 0;

        let longest = 1;
        let current = 1;

        for (let i = 1; i < sorted.length; i++) {
            const prev = new Date(sorted[i - 1] + 'T00:00:00');
            const curr = new Date(sorted[i] + 'T00:00:00');
            const diff = (curr - prev) / (1000 * 60 * 60 * 24);

            if (diff === 1) {
                current++;
                if (current > longest) longest = current;
            } else {
                current = 1;
            }
        }

        return longest;
    },

    // Month with the most posts — returns "Mon YYYY" string
    bestMonth: (collection) => {
        if (!collection || collection.length === 0) return '';

        const months = {};
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        collection.forEach(post => {
            const d = new Date(post.date || post.data?.date);
            if (!isNaN(d)) {
                const key = `${d.getFullYear()}-${d.getMonth()}`;
                months[key] = (months[key] || 0) + 1;
            }
        });

        let bestKey = null;
        let bestCount = 0;
        for (const [key, count] of Object.entries(months)) {
            if (count > bestCount) {
                bestCount = count;
                bestKey = key;
            }
        }

        if (!bestKey) return '';
        const [year, month] = bestKey.split('-');
        return `${monthNames[parseInt(month)]} ${year}`;
    }
};

export default statsFilters;

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
    }
};

export default statsFilters;

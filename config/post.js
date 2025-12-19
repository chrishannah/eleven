const postFilters = {
	excerpt: (content, maxLength = 300) => {
		// Handle undefined or null content
		if (!content) {
			return '';
		}

		try {
			content = content
				// Convert block-level HTML elements to line breaks
				.replace(/<\/p>/gi, '\n\n')
				.replace(/<br\s*\/?>/gi, '\n')
				.replace(/<\/div>/gi, '\n')
				.replace(/<\/li>/gi, '\n')
				// Remove remaining HTML tags
				.replace(/<[^>]+>/g, '')
				// Remove setext-style headers
				.replace(/^[=\-]{2,}\s*$/gm, '')
				// Remove footnotes
				.replace(/\[\^.+?\](\: .*?$)?/g, '')
				.replace(/\s{0,2}\[.*?\]: .*?$/gm, '')
				// Remove images
				.replace(/\!\[.*?\][\[\(].*?[\]\)]/g, '')
				// Remove inline links
				.replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
				// Remove blockquotes
				.replace(/^\s*>/gm, '')
				// Remove reference-style links
				.replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/gm, '')
				// Remove atx-style headers
				.replace(/^\#{1,6}\s*([^#]*)\s*(\#{1,6})?/gm, '$1')
				// Remove emphasis
				.replace(/([\*_]{1,3})(\S.*?\S)\1/g, '$2')
				// Remove code blocks
				.replace(/(`{3,})(.*?)\1/gms, '$2')
				// Remove inline code
				.replace(/`(.+?)`/g, '$1')
				// Remove horizontal rules
				.replace(/^-{3,}\s*$/gm, '')
				// Clean up whitespace around line breaks
				.replace(/[\t ]*\n[\t ]*/g, '\n')
				// Collapse multiple line breaks into double (paragraph breaks)
				.replace(/\n{3,}/g, '\n\n')
				// Convert single newlines to spaces (hard wraps within paragraphs)
				.replace(/([^\n])\n([^\n])/g, '$1 $2')
				.trim();
		} catch (e) {
			console.error(e);
			return content;
		}

		// If content is shorter than max, return as-is with no indicator
		if (content.length <= maxLength) {
			// Convert line breaks to <br> for HTML display
			return content.replace(/\n/g, '<br>');
		}

		// Find last space before maxLength to avoid cutting words
		const spaceIndex = content.lastIndexOf(' ', maxLength);
		const cutoff = spaceIndex > 0 ? spaceIndex : maxLength;

		let excerpt = content.substring(0, cutoff).trim();

		// Check if the last line is too short (less than 30 chars)
		// If so, remove it to avoid awkward truncation
		const lastLineBreak = excerpt.lastIndexOf('\n');
		if (lastLineBreak > 0) {
			const lastLine = excerpt.substring(lastLineBreak + 1);
			if (lastLine.length < 30) {
				excerpt = excerpt.substring(0, lastLineBreak).trim();
			}
		}

		excerpt += '…';
		// Convert line breaks to <br> for HTML display
		return excerpt.replace(/\n/g, '<br>');
	},

	microExcerpt: (content) => {
		// Handle undefined or null content
		if (!content) {
			return '"..."';
		}

		try {
			content = content
				// Remove HTML tags
				.replace(
					/<[\w|\s|=|\'|\"|\:|\(|\)|\,|\;|\/|0-9|\.|-|-|#|\[|\]]+[>|\\>]/g,
					"",
				)
				// Remove setext-style headers
				.replace(/^[=\-]{2,}\s*$/g, "")
				// Remove footnotes?
				.replace(/\[\^.+?\](\: .*?$)?/g, "")
				.replace(/\s{0,2}\[.*?\]: .*?$/g, "")
				// Remove images
				.replace(/\!\[.*?\][\[\(].*?[\]\)]/g, "")
				// Remove inline links
				.replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1")
				// Remove Blockquotes
				.replace(/>/g, "")
				// Remove reference-style links?
				.replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, "")
				// Remove atx-style headers
				.replace(/^\#{1,6}\s*([^#]*)\s*(\#{1,6})?/gm, "$1")
				.replace(/([\*_]{1,3})(\S.*?\S)\1/g, "$2")
				.replace(/(`{3,})(.*?)\1/gm, "$2")
				.replace(/^-{3,}\s*$/g, "")
				// .replace(/`(.+?)`/g, '$1')
				.replace(/\n{2,}/g, "\n\n")
				// line breaks
				.replace(/(\\n)/g, "");
		} catch (e) {
			console.error(e);
			return content;
		}

		let final = content;
		const excerptSize = 80;
		const spaceIndex = content.lastIndexOf(" ", excerptSize);
		if (spaceIndex === -1) {
			final = content.substring(0, excerptSize);
		}
		final = content.substring(0, spaceIndex + 1);

		return '"' + final.trim() + "..." + '"';
	},

	cleanUrl: (url) => {
		try {
			return url
				.replace(/(^\w+:|^)\/\//, "")
				.replace("www.", "");
		} catch (e) {
			console.error(e);
			return url;
		}
	},
};

export default postFilters;

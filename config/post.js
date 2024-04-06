module.exports = {
	microExcerpt: (content) => {
		var output = content;
		try {
			output = output
				// Remove HTML tags
				.replace(/<[\w|\s|=|\'|\"|\:|\(|\)|\,|\;|\/|0-9|\.|-|-|#|\[|\]]+[>|\\>]/g, '')
				// Remove setext-style headers
				.replace(/^[=\-]{2,}\s*$/g, '')
				// Remove footnotes?
				.replace(/\[\^.+?\](\: .*?$)?/g, '')
				.replace(/\s{0,2}\[.*?\]: .*?$/g, '')
				// Remove images
				.replace(/\!\[.*?\][\[\(].*?[\]\)]/g, '')
				// Remove inline links
				.replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
				// Remove Blockquotes
				.replace(/>/g, '')
				// Remove reference-style links?
				.replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
				// Remove atx-style headers
				.replace(/^\#{1,6}\s*([^#]*)\s*(\#{1,6})?/gm, '$1')
				.replace(/([\*_]{1,3})(\S.*?\S)\1/g, '$2')
				.replace(/(`{3,})(.*?)\1/gm, '$2')
				.replace(/^-{3,}\s*$/g, '')
				// .replace(/`(.+?)`/g, '$1')
				.replace(/\n{2,}/g, '\n\n')
				// line breaks
				.replace(/(\\n)/g, '');
		} catch (e) {
			console.error(e);
			return md;
		}

		var final = output;
		const excerptSize = 80;
		const spaceIndex = output.lastIndexOf(' ', excerptSize);
		if (spaceIndex === -1) {
			final = output.substring(0, excerptSize)
		}
		final = output.substring(0, spaceIndex + 1);

		return "\"" + final.trim() + "..." + "\"";
	}
}


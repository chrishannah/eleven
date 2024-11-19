export function buildFavouriteContent(date, slug, extractedTitle, favoriteUrl) {
	return `---
layout: layouts/micro
date: ${date}
permalink: favourite/${slug}/
tags: [ "micro", "favorite"]
---
★ Favourite: ![${extractedTitle}](${favoriteUrl})`;
}

export function buildPostContent(title, date, slug, tags, content) {
	if (title === '' || title === undefined) {
		return buildStatusContent(date, slug, tags, content);
	}

	return `---
layout: layouts/post
title: "${title}"
date: ${date}
permalink: ${slug}/
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
---
${content}`;
}

export function buildStatusContent(date, slug, tags, content) {
	return `---
layout: layouts/micro
date: ${date}
permalink: micro/${slug}/
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
---
${content}`;
}

export default async function handler(req, res) {
	// Extract the token from the Authorization header
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'Missing or invalid Authorization header' });
	}
	const token = authHeader.split(' ')[1];

	// Validate the token
	const isValid = await validateToken(token);
	if (!isValid) {
		return res.status(401).json({ error: 'Invalid or expired token' });
	}

	if (req.method === 'POST') {
		return handleCreate(req, res);
	} else if (req.method === 'GET') {
		return handleQuery(req, res);
	}

	res.status(405).json({ error: 'Method not allowed' });
}

async function validateToken(token) {
	const { default: fetch } = await import('node-fetch');
	const tokenEndpoint = 'https://tokens.indieauth.com/token';

	try {
		const response = await fetch(tokenEndpoint, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		// Check if the token has the necessary scope
		if (!data.scope || !data.scope.includes('create')) {
			throw new Error('Token does not have the required scope');
		}

		return true;
	} catch (error) {
		console.error('Token validation error:', error);
		return false;
	}
}

async function handleCreate(req, res) {
	const { properties } = req.body;

	if (properties['like-of']) {
		return handleFavorite(properties, res);
	}

	// Handle content properly
	let content = '';
	if (Array.isArray(properties.content)) {
		content = properties.content[0].html || properties.content[0].value || properties.content[0];
	} else if (typeof properties.content === 'object') {
		content = properties.content.value || properties.content.html || JSON.stringify(properties.content);
	} else {
		content = properties.content || '';
	}

	const title = properties.name ? properties.name[0] : '';
	const date = new Date().toISOString();
	const slug = properties.slug ? properties.slug[0] : slugify(title || 'untitled');
	const requestTags = properties.category || [];
	const tags = [...new Set(['post', ...requestTags])];
	const fileName = `${date.split('T')[0]}-${slugify(title || 'untitled')}.md`;
	const fileContent = `---
layout: layouts/post
title: "${title}"
date: ${date}
permalink: ${slug}/
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
---
  ${content}`;

	try {
		await createFileInGitHub(fileName, fileContent);
		res.status(201).json({ success: true, url: `https://chrishannah.me/posts/${fileName}` });
	} catch (error) {
		res.status(500).json({ error: 'Failed to create post' });
	}
}

function handleQuery(req, res) {
	if (req.query.q === 'config') {
		res.status(200).json({
			"media-endpoint": "https://chrishannah.me/api/media",
			"syndicate-to": []
		});
	} else {
		res.status(400).json({ error: 'Invalid query' });
	}
}

async function handleFavorite(properties, res) {
	const { fetch } = await import('node-fetch');
	const { cheerio } = await import('cheerio');
	const { webmention } = await import('send-webmention');

	const favoriteUrl = properties['like-of'];
	console.log('favoriteUrl:', favoriteUrl);
	if (!favoriteUrl) {
		return res.status(400).json({ error: 'Missing favorite URL' });
	}

	const title = properties.name?.[0] || 'Favorite';
	const date = new Date().toISOString();
	const slug = slugify(title + '-' + date);
	const fileName = `${date.split('T')[0]}-${slug}.md`;

	// Extract title from the favorited URL
	let extractedTitle;
	try {
		const response = await fetch(favoriteUrl);
		const html = await response.text();
		const $ = cheerio.load(html);
		extractedTitle = $('title').text().trim();
	} catch (error) {
		console.error('Error extracting title:', error);
		extractedTitle = 'Untitled';
	}

	const fileContent = `---
layout: layouts/micro
date: ${date}
permalink: ${slug}/
tags: ["post", "micro", "favorite"]
---
★ Favourite: ![${extractedTitle}](${favoriteUrl})`;

	try {
		await createFileInGitHub(fileName, fileContent);
		const postUrl = `https://chrishannah.me/${slug}/`;

		// Send webmention
		try {
			const webmentionResult = await webmention(postUrl, favoriteUrl);
			console.log('Webmention sent:', webmentionResult);
		} catch (webmentionError) {
			console.error('Error sending webmention:', webmentionError);
		}

		res.status(201).json({
			success: true,
			url: postUrl
		});

	} catch (error) {
		console.error('Error creating favorite:', error);
		res.status(500).json({ error: 'Failed to create favorite' });
	}
}

async function createFileInGitHub(fileName, content) {
	const { Octokit } = await import('@octokit/rest');
	const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

	const path = `posts/${fileName}`;
	console.log(`Attempting to create file at path: ${path}`);

	try {
		const response = await octokit.repos.createOrUpdateFileContents({
			owner: 'chrishannah',
			repo: 'eleven',
			path: path,
			message: `Add new post: ${fileName}`,
			content: Buffer.from(content).toString('base64'),
			branch: 'master'
		});
		console.log('File created successfully:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error creating file:', error);
		console.error('Error details:', error.response?.data);
		throw error;
	}
}

function slugify(text) {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

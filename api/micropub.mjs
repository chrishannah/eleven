import { buildPostContent, buildFavouriteContent } from './buildPostContent.mjs';
import { createFileInGitHub } from './createFileInGitHub.mjs';
import { slugify } from './slugify.mjs';
import { validateToken } from './validateToken.mjs';

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

async function handleCreate(req, res) {
	const { properties } = req.body;

	if (req.body['like-of']) {
		return handlefavourite(req, res);
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
	const slug = properties.slug ? properties.slug[0] : slugify(title || date);
	const requestTags = properties.category || [];
	const tags = [...new Set(['post', ...requestTags])];
	const fileName = `${slug}.md`;
	const fileContent = buildPostContent(title, date, slug, tags, content);

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

async function handlefavourite(req, res) {
	const favouriteUrl = req.body['like-of'];
	if (!favouriteUrl) {
		return res.status(400).json({ error: 'Missing favourite URL' });
	}

	const date = new Date().toISOString();
	const slug = slugify(date);
	const fileName = `favourite-${slug}.md`;

	// Extract title from the favourited URL
	let extractedTitle = await extractTitleFromUrl(favouriteUrl);

	const fileContent = buildFavouriteContent(date, slug, extractedTitle, favouriteUrl);

	try {
		await createFileInGitHub(fileName, fileContent);
		const postUrl = `https://chrishannah.me/${slug}/`;

		// Send webmention
		await sendWebmention(postUrl, favouriteUrl);

		res.writeHead(201, { 'Location': postUrl }).json({
			success: true,
			url: postUrl
		});

	} catch (error) {
		console.error('Error creating favourite:', error);
		res.status(500).json({ error: 'Failed to create favourite' });
	}
}
async function extractTitleFromUrl(url) {
	const cheerio = await import('cheerio');
	const fetch = (await import('node-fetch')).default;

	let extractedTitle;
	try {
		const response = await fetch(url);
		const html = await response.text();
		const $ = cheerio.load(html);
		extractedTitle = $('title').text().trim();
	} catch (error) {
		console.error('Error extracting title:', error);
		extractedTitle = url;
	}
	return extractedTitle;
}

async function sendWebmention(postUrl, favouriteUrl) {
	const { webmention } = await import('send-webmention');

	webmention({
		source: postUrl,
		target: favouriteUrl
	},
		function (err, obj) {
			if (obj) {
				console.log('Webmention sent:', obj);
			}
			if (err) {
				console.error('Error sending webmention:', err);
			}
		});
}


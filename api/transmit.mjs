const MESSAGE_MAX = 500;
const FROM_MAX = 80;

const stripControl = (s) =>
	s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(405).send('Method not allowed');
		return;
	}

	const body = req.body || {};

	// Honeypot — bots fill it, humans don't. Pretend success so they don't retry.
	if (typeof body.website === 'string' && body.website.trim() !== '') {
		res.redirect(303, '/transmitted/');
		return;
	}

	const message = stripControl(String(body.message || '').trim());
	if (!message || message.length > MESSAGE_MAX) {
		res.status(400).send('Invalid message');
		return;
	}

	let from = stripControl(String(body.from || '').trim());
	if (from.length > FROM_MAX) from = from.slice(0, FROM_MAX);

	const topic = process.env.NTFY_TOPIC;
	if (!topic) {
		console.error('NTFY_TOPIC env var not set');
		res.status(500).send('Server misconfigured');
		return;
	}
	const server = process.env.NTFY_SERVER || 'https://ntfy.sh';

	const referer = req.headers.referer || 'https://chrishannah.me';
	const bodyLines = [];
	if (from) bodyLines.push(`From: ${from}`);
	bodyLines.push(`Page: ${referer}`);
	bodyLines.push('');
	bodyLines.push(message);

	try {
		const response = await fetch(`${server}/${encodeURIComponent(topic)}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Title': 'chrishannah.me transmission',
				'Click': referer,
			},
			body: bodyLines.join('\n'),
		});
		if (!response.ok) {
			console.error('ntfy error:', response.status, await response.text());
			res.status(502).send('Upstream error');
			return;
		}
	} catch (err) {
		console.error('ntfy fetch failed:', err);
		res.status(502).send('Upstream error');
		return;
	}

	res.redirect(303, '/transmitted/');
}

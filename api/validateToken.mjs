export async function validateToken(token) {
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

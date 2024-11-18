export async function createFileInGitHub(fileName, content) {
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

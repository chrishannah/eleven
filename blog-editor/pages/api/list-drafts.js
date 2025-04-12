import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Path to the drafts directory
    const draftsDir = join(process.cwd(), '..', 'posts', 'drafts');

    // Get all markdown files in the drafts directory
    const files = await readdir(draftsDir);
    const draftFiles = files.filter(file => file.endsWith('.md'));

    // Read each draft file and extract metadata
    const drafts = await Promise.all(
      draftFiles.map(async (file) => {
        const filePath = join(draftsDir, file);
        const content = await readFile(filePath, 'utf8');

        // Extract frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) {
          return {
            filename: file,
            title: file.replace('.md', ''),
            date: new Date().toISOString(),
            content: content,
          };
        }

        const frontmatter = frontmatterMatch[1];
        const metadata = parse(frontmatter);
        const markdownContent = content.slice(frontmatterMatch[0].length).trim();

        return {
          filename: file,
          title: metadata.title || file.replace('.md', ''),
          date: metadata.date || new Date().toISOString(),
          tags: metadata.tags || [],
          featuredImage: metadata.featuredImage || '',
          content: markdownContent,
        };
      })
    );

    res.status(200).json({ drafts });
  } catch (error) {
    console.error('Error listing drafts:', error);
    res.status(500).json({ message: 'Error listing drafts', error: error.message });
  }
}

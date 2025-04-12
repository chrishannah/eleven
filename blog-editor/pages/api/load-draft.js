import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { filename } = req.query;

    if (!filename) {
      return res.status(400).json({ message: 'Filename is required' });
    }

    // Path to the draft file
    const draftPath = join(process.cwd(), '..', 'posts', 'drafts', filename);

    // Read the draft file
    const content = await readFile(draftPath, 'utf8');

    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      return res.status(200).json({
        title: filename.replace('.md', ''),
        date: new Date().toISOString(),
        content: content,
        isDraft: true,
      });
    }

    const frontmatter = frontmatterMatch[1];
    const metadata = parse(frontmatter);
    const markdownContent = content.slice(frontmatterMatch[0].length).trim();

    res.status(200).json({
      title: metadata.title || filename.replace('.md', ''),
      date: metadata.date || new Date().toISOString(),
      tags: metadata.tags || [],
      featuredImage: metadata.featuredImage || '',
      content: markdownContent,
      isDraft: true,
    });
  } catch (error) {
    console.error('Error loading draft:', error);
    res.status(500).json({ message: 'Error loading draft', error: error.message });
  }
}

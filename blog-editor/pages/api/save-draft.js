import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { format } from 'date-fns';
import { existsSync } from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content, title, date } = req.body;

    // Create the file path based on the date
    const postDate = new Date(date);
    const year = format(postDate, 'yyyy');
    const month = format(postDate, 'MM');

    // Create the filename using the title
    const filename = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Construct the full path for drafts
    const draftsDir = join(process.cwd(), '..', 'posts', 'drafts');
    const filePath = join(draftsDir, `${filename}.md`);

    // Ensure the drafts directory exists
    if (!existsSync(draftsDir)) {
      await mkdir(draftsDir, { recursive: true });
    }

    // Add draft: true to the frontmatter
    const draftContent = content.replace(
      /^---\n/,
      '---\ndraft: true\n'
    );

    // Write the file
    await writeFile(filePath, draftContent, 'utf8');

    res.status(200).json({ message: 'Draft saved successfully' });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ message: 'Error saving draft', error: error.message });
  }
}

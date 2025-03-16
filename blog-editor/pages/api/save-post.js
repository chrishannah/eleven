import { writeFile } from 'fs/promises';
import { join } from 'path';
import { format } from 'date-fns';

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

    // Construct the full path
    const postsDir = join(process.cwd(), '..', 'posts', year, month);
    const filePath = join(postsDir, `${filename}.md`);

    // Ensure the directory exists
    await writeFile(filePath, content, 'utf8');

    res.status(200).json({ message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Error saving post', error: error.message });
  }
}

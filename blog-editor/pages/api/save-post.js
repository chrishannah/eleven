import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { format } from 'date-fns';
import { existsSync } from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content, title, date, isDraft, currentDraftFile, slug } = req.body;

    // Create the file path based on the date
    const postDate = new Date(date);
    const year = format(postDate, 'yyyy');
    const month = format(postDate, 'MM');

    // Filename: prefer the slug the client computed (matches the permalink in
    // frontmatter); fall back to the title, then to a timestamp so we never
    // write an empty-named file.
    const fromTitle = (title || '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const fallbackFromDate = (() => {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}-${pad(d.getMinutes())}`;
    })();
    const filename = (slug || fromTitle) || fallbackFromDate;

    // Determine the directory based on draft status
    const baseDir = join(process.cwd(), '..', 'posts');
    const targetDir = isDraft
      ? join(baseDir, 'drafts')
      : join(baseDir, year, month);

    const filePath = join(targetDir, `${filename}.md`);

    // Ensure the directory exists
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }

    // If we're editing an existing draft and the filename has changed,
    // delete the old draft file
    if (currentDraftFile && currentDraftFile !== `${filename}.md`) {
      const oldDraftPath = join(baseDir, 'drafts', currentDraftFile);
      if (existsSync(oldDraftPath)) {
        await unlink(oldDraftPath);
      }
    }

    // Add draft: true to the frontmatter if it's a draft and doesn't already have it
    let finalContent = content;
    if (isDraft) {
      // Check if draft: true already exists in the frontmatter
      if (!content.includes('draft: true')) {
        finalContent = content.replace(
          /^---\n/,
          '---\ndraft: true\n'
        );
      }
    } else {
      // If we're publishing a draft, remove the draft: true from the frontmatter
      finalContent = content.replace(/draft: true\n/, '');
    }

    // Write the file
    await writeFile(filePath, finalContent, 'utf8');

    res.status(200).json({ message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Error saving post', error: error.message });
  }
}

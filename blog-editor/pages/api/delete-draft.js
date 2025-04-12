import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { filename } = req.query;

    if (!filename) {
      return res.status(400).json({ message: 'Filename is required' });
    }

    // Path to the draft file
    const draftPath = join(process.cwd(), '..', 'posts', 'drafts', filename);

    // Check if the file exists
    if (!existsSync(draftPath)) {
      return res.status(404).json({ message: 'Draft not found' });
    }

    // Delete the file
    await unlink(draftPath);

    res.status(200).json({ message: 'Draft deleted successfully' });
  } catch (error) {
    console.error('Error deleting draft:', error);
    res.status(500).json({ message: 'Error deleting draft', error: error.message });
  }
}

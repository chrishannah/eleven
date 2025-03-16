import { promises as fs } from 'fs';
import { join } from 'path';
import formidable from 'formidable';
import sharp from 'sharp';
import { format } from 'date-fns';

export const config = {
  api: {
    bodyParser: false,
  },
};

const getImagePath = (filename, createDir = false) => {
  const date = new Date();
  const year = format(date, 'yyyy');
  const month = format(date, 'MM');
  const dir = join(process.cwd(), '..', 'static', 'images', year, month);

  if (createDir) {
    fs.mkdir(dir, { recursive: true });
  }

  return {
    fullPath: join(dir, filename),
    relativePath: `/images/${year}/${month}/${filename}`,
    dir,
  };
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received POST request to /api/image');
    const form = formidable({
      uploadDir: join(process.cwd(), '..', 'static', 'images', 'temp'),
      keepExtensions: true,
      multiples: true,
    });

    try {
      // Create temp directory if it doesn't exist
      const uploadDir = join(process.cwd(), '..', 'static', 'images', 'temp');
      console.log('Creating temp directory:', uploadDir);
      await fs.mkdir(uploadDir, { recursive: true });

      console.log('Parsing form data...');
      const [fields, files] = await form.parse(req);
      console.log('Files received:', files);
      const file = files.file?.[0];

      if (!file) {
        console.error('No file found in request');
        return res.status(400).json({ error: 'No file uploaded' });
      }

      console.log('Processing file:', file.originalFilename);
      const { fullPath, relativePath, dir } = getImagePath(file.originalFilename, true);

      console.log('Creating directory:', dir);
      await fs.mkdir(dir, { recursive: true });

      console.log('Copying file to:', fullPath);
      await fs.copyFile(file.filepath, fullPath);

      console.log('Cleaning up temp file:', file.filepath);
      await fs.unlink(file.filepath);

      const stats = await fs.stat(fullPath);
      console.log('File stats:', stats);

      const response = {
        filename: file.originalFilename,
        path: relativePath,
        size: stats.size,
      };
      console.log('Sending response:', response);
      res.status(200).json(response);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: error.message || 'Failed to upload file' });
    }
  }
  else if (req.method === 'PUT') {
    const { oldPath, newName } = req.body;

    try {
      const oldFullPath = join(process.cwd(), '..', 'static', oldPath);
      const { fullPath, relativePath } = getImagePath(newName);

      await fs.mkdir(join(process.cwd(), '..', 'static', 'images', format(new Date(), 'yyyy'), format(new Date(), 'MM')), { recursive: true });
      await fs.rename(oldFullPath, fullPath);

      res.status(200).json({ path: relativePath });
    } catch (error) {
      console.error('Rename error:', error);
      res.status(500).json({ error: 'Failed to rename file' });
    }
  }
  else if (req.method === 'DELETE') {
    const { path } = req.body;

    try {
      const fullPath = join(process.cwd(), '..', 'static', path);
      await fs.unlink(fullPath);

      res.status(200).json({ message: 'File deleted' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Failed to delete file' });
    }
  }
  else if (req.method === 'PATCH') {
    const { path } = req.body;

    try {
      const fullPath = join(process.cwd(), '..', 'static', path);
      const optimizedPath = fullPath.replace(/\.[^.]+$/, '_optimized$&');

      await sharp(fullPath)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .png({ progressive: true })
        .toFile(optimizedPath);

      await fs.unlink(fullPath);
      await fs.rename(optimizedPath, fullPath);

      const stats = await fs.stat(fullPath);

      res.status(200).json({ size: stats.size });
    } catch (error) {
      console.error('Optimization error:', error);
      res.status(500).json({ error: 'Failed to optimize image' });
    }
  }
  else {
    res.setHeader('Allow', ['POST', 'PUT', 'DELETE', 'PATCH']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

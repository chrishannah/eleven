import { promises as fs } from 'fs';
import { join } from 'path';

const POSTS_DIR = () => join(process.cwd(), '..', 'posts');

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      yield full;
    }
  }
}

const FRONT_RE = /^---\n([\s\S]*?)\n---/;

function parseTagsFromFrontmatter(text) {
  const m = text.match(FRONT_RE);
  if (!m) return [];
  const fm = m[1];
  // Match `tags: [a, b, "c"]` (inline)
  const inline = fm.match(/^tags:\s*\[([^\]]*)\]/m);
  if (inline) {
    return inline[1]
      .split(',')
      .map((t) => t.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }
  // Block form: `tags:\n  - a\n  - b`
  const block = fm.match(/^tags:\n((?:[ \t]*-[ \t]*.+\n?)+)/m);
  if (block) {
    return block[1]
      .split('\n')
      .map((line) => line.replace(/^[ \t]*-[ \t]*/, '').trim())
      .map((t) => t.replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }
  return [];
}

let cache = { ts: 0, tags: [] };
const TTL = 30_000;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (Date.now() - cache.ts < TTL && cache.tags.length) {
    return res.status(200).json({ tags: cache.tags });
  }

  const counts = new Map();
  try {
    for await (const file of walk(POSTS_DIR())) {
      const text = await fs.readFile(file, 'utf8');
      for (const t of parseTagsFromFrontmatter(text)) {
        counts.set(t, (counts.get(t) || 0) + 1);
      }
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  const tags = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));

  cache = { ts: Date.now(), tags };
  res.status(200).json({ tags });
}

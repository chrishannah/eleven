import { exec } from 'child_process';
import { promisify } from 'util';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

const execAsync = promisify(exec);

const REPO_ROOT = resolve(process.cwd(), '..');

// Resolve a repo-relative path safely; refuse anything that escapes the repo.
function safeRepoPath(relPath) {
  const abs = resolve(REPO_ROOT, relPath);
  if (!abs.startsWith(REPO_ROOT + '/') && abs !== REPO_ROOT) {
    throw new Error(`Path escapes repo: ${relPath}`);
  }
  return abs;
}

// Extract /images/... paths referenced anywhere in the markdown.
function extractImagePaths(markdown) {
  const matches = markdown.matchAll(/\/images\/[A-Za-z0-9_\-./]+\.(?:jpg|jpeg|png|gif|webp|avif|svg)/gi);
  const set = new Set();
  for (const m of matches) set.add(m[0]);
  return [...set];
}

// Returns the set of repo-relative paths under static/ that git sees as new or modified.
async function changedStaticPaths() {
  const { stdout } = await execAsync('git status --porcelain -- static', { cwd: REPO_ROOT });
  const out = new Set();
  for (const line of stdout.split('\n')) {
    if (!line.trim()) continue;
    // Porcelain format: XY <path>  (rename uses ' -> ')
    const path = line.slice(3).split(' -> ').pop();
    out.add(path);
  }
  return out;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { filePath, title } = req.body;
    if (!filePath) return res.status(400).json({ message: 'filePath is required' });

    const absMd = safeRepoPath(filePath);
    const markdown = await readFile(absMd, 'utf8');

    // Referenced images -> their repo-relative static paths
    const referenced = extractImagePaths(markdown).map((p) => `static${p}`);
    const changedStatic = await changedStaticPaths();
    const imagesToStage = referenced.filter((p) => changedStatic.has(p));

    const toStage = [filePath, ...imagesToStage];

    // Stage exactly the relevant files
    const addArgs = toStage.map((p) => `'${p.replace(/'/g, "'\\''")}'`).join(' ');
    await execAsync(`git add -- ${addArgs}`, { cwd: REPO_ROOT });

    // Verify something is actually staged (avoid empty commit if file was unchanged)
    const { stdout: diffOut } = await execAsync('git diff --cached --name-only', { cwd: REPO_ROOT });
    const stagedFiles = diffOut.split('\n').filter(Boolean);
    if (stagedFiles.length === 0) {
      return res.status(200).json({
        message: 'Nothing to commit — file already up to date.',
        committed: false,
        stagedFiles: [],
      });
    }

    const safeTitle = (title || 'untitled').replace(/'/g, "'\\''");
    await execAsync(`git commit -m 'post: ${safeTitle}'`, { cwd: REPO_ROOT });

    const { stdout: pushOut, stderr: pushErr } = await execAsync('git push', { cwd: REPO_ROOT });

    res.status(200).json({
      message: 'Committed and pushed',
      committed: true,
      stagedFiles,
      push: (pushOut + pushErr).trim(),
    });
  } catch (error) {
    console.error('commit-push error:', error);
    res.status(500).json({ message: 'Error during commit/push', error: error.message });
  }
}

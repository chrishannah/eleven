#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  postsDir: path.join(__dirname, 'posts'),
  staticDir: path.join(__dirname, 'static'),
  exportDir: path.join(__dirname, 'ghost-export'),
  siteDomain: 'https://chrishannah.me',
  ghostVersion: '5.0.0',
  maxChunkSize: 95 * 1024 * 1024, // 95MB to be safe
  authorSlug: 'chris'
};

// Track copied images globally to avoid duplicates
const copiedImages = new Map(); // originalPath -> { newPath, size, destPath }

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function stripQuotes(value) {
  if (!value || typeof value !== 'string') return value;

  // Remove leading and trailing quotes (both single and double)
  // Handle cases like 'value', "value", 'value", "value'
  const trimmed = value.trim();

  // Check if starts with quote and ends with quote
  if ((trimmed.startsWith("'") || trimmed.startsWith('"')) &&
      (trimmed.endsWith("'") || trimmed.endsWith('"'))) {
    return trimmed.substring(1, trimmed.length - 1);
  }

  return trimmed;
}

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return { frontmatter: {}, content: content };

  const frontmatterText = match[1];
  const frontmatter = {};
  const lines = frontmatterText.split('\n');

  let currentKey = null;
  let currentArray = null;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Handle JSON array notation: tags: ["post", "micro"]
    if (line.includes(':') && line.includes('[') && line.includes(']')) {
      const colonIndex = line.indexOf(':');
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      try {
        frontmatter[key] = JSON.parse(value);
        currentKey = null;
        currentArray = null;
      } catch (e) {
        frontmatter[key] = value;
      }
      continue;
    }

    // Handle YAML list items: - tag1
    if (line.startsWith('- ')) {
      if (currentArray) {
        currentArray.push(stripQuotes(line.substring(2).trim()));
      }
      continue;
    }

    // Handle key: value pairs
    if (line.includes(':')) {
      const colonIndex = line.indexOf(':');
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      if (value === '' || value === "''" || value === '""') {
        // Empty value, might start an array
        currentKey = key;
        currentArray = [];
        frontmatter[key] = currentArray;
      } else {
        frontmatter[key] = stripQuotes(value);
        currentKey = null;
        currentArray = null;
      }
    }
  }

  const bodyContent = content.substring(match[0].length);
  return { frontmatter, content: bodyContent };
}

function generateMicroTitle(content, date) {
  // Remove HTML tags to get plain text
  const plainText = content.replace(/<[^>]*>/g, '').trim();

  // Clean up extra whitespace
  const cleaned = plainText.replace(/\s+/g, ' ');

  // Try to get the first sentence
  const firstSentence = cleaned.split(/[.!?]\s/)[0];

  // If first sentence is good length (10-100 chars), use it
  if (firstSentence && firstSentence.length > 10 && firstSentence.length <= 100) {
    return firstSentence;
  }

  // Otherwise, take first 60 characters
  if (cleaned.length > 10) {
    const truncated = cleaned.substring(0, 60).trim();
    return truncated + (cleaned.length > 60 ? '...' : '');
  }

  // Last resort: use date
  const dateStr = new Date(date).toISOString().split('T')[0];
  return `Micro post from ${dateStr}`;
}

function removeFootnotes(html) {
  // Remove footnote references like [^1]
  html = html.replace(/\[\^(\d+)\]/g, '');

  // Remove footnote sections
  html = html.replace(/<section class="footnotes">[\s\S]*?<\/section>/g, '');
  html = html.replace(/<div class="footnotes">[\s\S]*?<\/div>/g, '');

  // Remove markdown-style footnote definitions
  html = html.replace(/\n\n\[\^(\d+)\]:.*$/gm, '');

  return html;
}

function isFavouritePost(filePath, frontmatter) {
  const fileName = path.basename(filePath, '.md');
  const permalink = frontmatter.permalink || '';

  // Check filename patterns
  if (fileName.startsWith('favourite-') || fileName.startsWith('like-')) {
    return true;
  }

  // Check permalink patterns
  if (permalink.includes('favourite/') || permalink.includes('like/')) {
    return true;
  }

  // Check tags/categories
  const tags = frontmatter.tags || [];
  const categories = frontmatter.categories || [];
  const allTags = [...(Array.isArray(tags) ? tags : [tags]), ...(Array.isArray(categories) ? categories : [categories])];

  if (allTags.some(tag => tag && (tag.toLowerCase() === 'favorite' || tag.toLowerCase() === 'favourite'))) {
    return true;
  }

  return false;
}

function copyImageToTemp(imageUrl, tempDir) {
  // Handle various URL formats
  let localPath = null;

  // Remove domain if present
  const cleanUrl = imageUrl.replace(CONFIG.siteDomain, '');

  // Try different possible locations
  const possiblePaths = [
    path.join(CONFIG.staticDir, 'images', path.basename(cleanUrl)),
    path.join(__dirname, cleanUrl.replace(/^\//, '')),
    path.join(__dirname, 'static', cleanUrl.replace(/^\//, '')),
  ];

  for (const testPath of possiblePaths) {
    if (fs.existsSync(testPath)) {
      localPath = testPath;
      break;
    }
  }

  if (!localPath || !fs.existsSync(localPath)) {
    return null;
  }

  // Check if already copied
  if (copiedImages.has(localPath)) {
    const existing = copiedImages.get(localPath);
    return { url: existing.newPath, size: 0, originalPath: localPath }; // Size is 0 for duplicates
  }

  // Get file info
  const fileName = path.basename(localPath);
  const size = getFileSize(localPath);
  const newPath = '__GHOST_URL__/content/images/' + fileName;

  // Track the image
  copiedImages.set(localPath, {
    newPath,
    size,
    originalPath: localPath,
    fileName
  });

  return { url: newPath, size, originalPath: localPath };
}

function processImagesInContent(html, tempDir) {
  const images = new Set();
  let totalSize = 0;

  // Process image tags
  html = html.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/g, (match, src) => {
    const result = copyImageToTemp(src, tempDir);
    if (result) {
      images.add(result.originalPath);
      totalSize += result.size;
      return match.replace(src, result.url);
    }
    return match;
  });

  // Process markdown-style images ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    const result = copyImageToTemp(src, tempDir);
    if (result) {
      images.add(result.originalPath);
      totalSize += result.size;
      return `![${alt}](${result.url})`;
    }
    return match;
  });

  return { html, images, size: totalSize };
}

function convertPostToGhost(filePath, postId) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, content: bodyContent } = parseFrontmatter(content);

  // Check if this is a favourite post (should be excluded)
  if (isFavouritePost(filePath, frontmatter)) {
    return null;
  }

  // Parse tags properly
  let tags = [];
  if (frontmatter.tags) {
    if (Array.isArray(frontmatter.tags)) {
      tags = [...frontmatter.tags];
    } else if (typeof frontmatter.tags === 'string') {
      tags = [frontmatter.tags];
    }
  }
  if (frontmatter.categories) {
    if (Array.isArray(frontmatter.categories)) {
      tags = [...tags, ...frontmatter.categories];
    } else if (typeof frontmatter.categories === 'string') {
      tags = [...tags, frontmatter.categories];
    }
  }

  // Clean up tags: remove brackets, quotes, make lowercase, filter system tags
  tags = tags
    .filter(t => t && !['post', 'micro', 'link'].includes(t.toLowerCase()))
    .map(t => t.replace(/["'\[\]]/g, '').trim().toLowerCase())
    .filter(t => t.length > 0);

  // Add #migrated internal tag to hide from homepage
  tags.push('#migrated');

  // Remove duplicates
  tags = [...new Set(tags)];

  // Process content
  let html = bodyContent.trim();

  // Remove footnotes
  html = removeFootnotes(html);

  // Process images in content
  const tempDir = path.join(CONFIG.exportDir, 'temp');
  const { html: processedHtml, images: contentImages, size: contentImageSize } = processImagesInContent(html, tempDir);
  html = processedHtml;

  // Get title
  let title = frontmatter.title || '';
  // Ensure title is a string
  if (typeof title !== 'string') {
    title = '';
  }

  // Generate title for micro posts if missing
  if (!title || title.toLowerCase() === 'untitled' || title === 'null') {
    const layout = frontmatter.layout || '';
    if (layout.includes('micro') || tags.includes('micro')) {
      title = generateMicroTitle(html, frontmatter.date);
    } else {
      title = 'Untitled';
    }
  }

  // Parse date
  let publishedAt;
  if (frontmatter.date) {
    const parsedDate = new Date(frontmatter.date);
    publishedAt = isNaN(parsedDate.getTime()) ? new Date().toISOString() : parsedDate.toISOString();
  } else {
    publishedAt = new Date().toISOString();
  }

  // Generate slug from permalink or filename
  let slug = frontmatter.permalink || path.basename(filePath, '.md');
  slug = String(slug).replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-');

  // Process featured image
  let featuredImagePath = null;
  let featuredImageSize = 0;
  if (frontmatter.image) {
    const result = copyImageToTemp(frontmatter.image, tempDir);
    if (result) {
      featuredImagePath = result.url;
      featuredImageSize = result.size;
      contentImages.add(result.originalPath);
    }
  }

  // Calculate total size for this post (rough estimate)
  const jsonSize = JSON.stringify({ title, slug, html }).length;
  const totalSize = jsonSize + contentImageSize + featuredImageSize;

  const post = {
    id: postId,
    uuid: randomUUID(),
    title: title,
    slug: slug,
    mobiledoc: null,
    html: html,
    comment_id: postId,
    feature_image: featuredImagePath,
    featured: 0,
    type: 'post',
    status: 'published',
    locale: null,
    visibility: 'public',
    email_recipient_filter: 'none',
    created_at: publishedAt,
    created_by: '1',
    updated_at: publishedAt,
    updated_by: '1',
    published_at: publishedAt,
    published_by: '1',
    custom_excerpt: frontmatter.description || null,
    codeinjection_head: null,
    codeinjection_foot: null,
    custom_template: null,
    canonical_url: null
  };

  return {
    post,
    tags,
    images: contentImages,
    size: totalSize
  };
}

function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

async function createZipFile(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`  Created ${path.basename(outputPath)}: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
      resolve();
    });

    archive.on('error', (err) => reject(err));

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

async function main() {
  console.log('🚀 Starting Ghost migration with chunking...\n');

  // Clean up previous export
  if (fs.existsSync(CONFIG.exportDir)) {
    fs.rmSync(CONFIG.exportDir, { recursive: true });
  }
  fs.mkdirSync(CONFIG.exportDir, { recursive: true });

  // Get all markdown files
  const mdFiles = getAllMarkdownFiles(CONFIG.postsDir);
  console.log(`📄 Found ${mdFiles.length} markdown files\n`);

  // First pass: Convert all posts and track images
  const allPosts = [];
  const tagMap = new Map();
  let postId = 1;

  console.log('📝 Converting posts...');
  for (const filePath of mdFiles) {
    const result = convertPostToGhost(filePath, postId.toString());
    if (!result) continue; // Skip favourites

    const { post, tags, images, size } = result;

    // Track tags
    tags.forEach(tagName => {
      if (!tagMap.has(tagName)) {
        const isInternal = tagName.startsWith('#');
        tagMap.set(tagName, {
          id: `${tagMap.size + 1}`,
          name: isInternal ? tagName.substring(1) : tagName,
          slug: (isInternal ? tagName.substring(1) : tagName).toLowerCase().replace(/\s+/g, '-'),
          description: null,
          visibility: isInternal ? 'internal' : 'public'
        });
      }
    });

    // Create post-tag relationships
    const postTags = tags.map((tagName, index) => ({
      post_id: post.id,
      tag_id: tagMap.get(tagName).id,
      sort_order: index
    }));

    // Create post-author relationship
    const postAuthor = {
      post_id: post.id,
      author_id: '1',
      sort_order: 0
    };

    allPosts.push({
      post,
      postTags,
      author: postAuthor,
      images,
      size
    });

    postId++;
  }

  console.log(`  Converted ${allPosts.length} posts (${mdFiles.length - allPosts.length} favourites excluded)`);
  console.log(`  Collected ${copiedImages.size} unique images`);
  console.log(`  Created ${tagMap.size} tags\n`);

  // Second pass: Split into chunks based on size
  console.log('📦 Creating chunks...');
  const chunks = [];
  let currentChunk = {
    posts: [],
    posts_meta: [],
    tags: Array.from(tagMap.values()),
    posts_tags: [],
    posts_authors: [],
    images: new Set()
  };
  let currentSize = 10000; // Base overhead for JSON structure

  for (const postData of allPosts) {
    // Check if adding this post would exceed chunk size
    if (currentSize + postData.size > CONFIG.maxChunkSize && currentChunk.posts.length > 0) {
      // Save current chunk and start a new one
      chunks.push(currentChunk);
      currentChunk = {
        posts: [],
        posts_meta: [],
        tags: Array.from(tagMap.values()),
        posts_tags: [],
        posts_authors: [],
        images: new Set()
      };
      currentSize = 10000;
    }

    // Add post to current chunk
    currentChunk.posts.push(postData.post);
    currentChunk.posts_authors.push(postData.author);
    currentChunk.posts_tags.push(...postData.postTags);
    postData.images.forEach(img => currentChunk.images.add(img));
    currentSize += postData.size;
  }

  // Add the last chunk
  if (currentChunk.posts.length > 0) {
    chunks.push(currentChunk);
  }

  console.log(`  Created ${chunks.length} chunks\n`);

  // Create chunk directories and files
  console.log('💾 Writing chunk files...');
  for (let i = 0; i < chunks.length; i++) {
    const chunkNum = i + 1;
    const chunk = chunks[i];
    const chunkDir = path.join(CONFIG.exportDir, `chunk-${chunkNum}`);
    const imagesDir = path.join(chunkDir, 'content', 'images');

    fs.mkdirSync(imagesDir, { recursive: true });

    // Copy images for this chunk
    let totalImageSize = 0;
    chunk.images.forEach(originalPath => {
      const imageInfo = copiedImages.get(originalPath);
      if (imageInfo) {
        const destPath = path.join(imagesDir, imageInfo.fileName);
        fs.copyFileSync(originalPath, destPath);
        totalImageSize += imageInfo.size;
      }
    });

    // Create Ghost export JSON
    const ghostExport = {
      db: [{
        meta: {
          exported_on: Date.now(),
          version: CONFIG.ghostVersion
        },
        data: {
          posts: chunk.posts,
          posts_meta: chunk.posts_meta,
          tags: chunk.tags,
          posts_tags: chunk.posts_tags,
          posts_authors: chunk.posts_authors
        }
      }]
    };

    // Write JSON file
    const jsonPath = path.join(chunkDir, 'ghost-import.json');
    fs.writeFileSync(jsonPath, JSON.stringify(ghostExport, null, 2));

    const jsonSize = getFileSize(jsonPath);
    const totalChunkSize = jsonSize + totalImageSize;

    console.log(`  Chunk ${chunkNum}: ${(totalChunkSize / 1024 / 1024).toFixed(2)} MB (${chunk.posts.length} posts, ${chunk.images.size} images)`);

    // Create ZIP file for this chunk
    const zipPath = path.join(CONFIG.exportDir, `ghost-import-part${chunkNum}.zip`);
    await createZipFile(chunkDir, zipPath);
  }

  console.log('\n✅ Migration complete!');
  console.log(`\n📊 Summary:`);
  console.log(`  - ${allPosts.length} posts migrated`);
  console.log(`  - ${mdFiles.length - allPosts.length} favourite posts excluded`);
  console.log(`  - ${tagMap.size} tags created`);
  console.log(`  - ${copiedImages.size} images copied`);
  console.log(`  - ${chunks.length} ZIP files created`);
  console.log(`\n📂 Import files:`);
  for (let i = 1; i <= chunks.length; i++) {
    console.log(`  - ghost-export/ghost-import-part${i}.zip`);
  }
  console.log(`\n📖 See GHOST-MIGRATION-README.md for import instructions`);
}

main().catch(console.error);

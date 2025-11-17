#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  postsDir: path.join(__dirname, 'posts'),
  staticDir: path.join(__dirname, 'static'),
  exportDir: path.join(__dirname, 'ghost-export'),
  imagesDir: path.join(__dirname, 'ghost-export', 'content', 'images'),
  siteDomain: 'https://chrishannah.me',
  ghostVersion: '5.0.0',
  maxFileSize: 100 * 1024 * 1024, // 100MB in bytes
  authorSlug: 'chris'
};

// Simple YAML frontmatter parser
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: content };
  }

  const frontmatterText = match[1];
  const bodyContent = match[2];

  const frontmatter = {};
  let currentKey = null;
  let currentValue = [];
  let inArray = false;

  const lines = frontmatterText.split('\n');

  for (let line of lines) {
    // Check for JSON array notation: tags: ["post", "micro"]
    if (line.includes(':') && line.includes('[') && line.includes(']')) {
      const colonIndex = line.indexOf(':');
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      try {
        // Parse JSON array
        frontmatter[key] = JSON.parse(value);
      } catch (e) {
        // If JSON parsing fails, treat as string
        frontmatter[key] = value;
      }
      continue;
    }

    // Check if it's a key-value pair
    if (line.includes(':') && !line.trim().startsWith('-')) {
      // Save previous key if exists
      if (currentKey) {
        if (inArray) {
          frontmatter[currentKey] = currentValue;
        } else {
          frontmatter[currentKey] = currentValue.join('\n').trim();
        }
      }

      const colonIndex = line.indexOf(':');
      currentKey = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      if (value) {
        // Direct value
        frontmatter[currentKey] = value;
        currentKey = null;
        currentValue = [];
        inArray = false;
      } else {
        // Array or multiline value follows
        currentValue = [];
        inArray = true;
      }
    } else if (currentKey && line.trim().startsWith('-')) {
      // YAML array item
      const item = line.trim().substring(1).trim();
      currentValue.push(item);
    } else if (currentKey) {
      // Continuation of previous value
      currentValue.push(line);
    }
  }

  // Save last key
  if (currentKey) {
    if (inArray) {
      frontmatter[currentKey] = currentValue;
    } else {
      frontmatter[currentKey] = currentValue.join('\n').trim();
    }
  }

  return { frontmatter, content: bodyContent };
}

// Remove or fix markdown footnotes
function removeFootnotes(html) {
  // Remove footnote reference links [^1]
  html = html.replace(/\[\^(\d+)\]/g, '');

  // Remove footnote sections at the bottom
  html = html.replace(/<section class="footnotes">[\s\S]*?<\/section>/g, '');
  html = html.replace(/<div class="footnotes">[\s\S]*?<\/div>/g, '');

  // Remove footnote-style links at the end
  html = html.replace(/\n\n\[\^(\d+)\]:.*$/gm, '');

  return html;
}

// Generate a good title for micro posts
function generateMicroTitle(content, date) {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '').trim();

  // Remove extra whitespace
  const cleaned = plainText.replace(/\s+/g, ' ');

  // Try to get first sentence
  const firstSentence = cleaned.split(/[.!?]\s/)[0];

  if (firstSentence && firstSentence.length > 10 && firstSentence.length <= 100) {
    return firstSentence;
  }

  // If first sentence is too short or long, take first 60 chars
  if (cleaned.length > 10) {
    const truncated = cleaned.substring(0, 60).trim();
    return truncated + (cleaned.length > 60 ? '...' : '');
  }

  // Fallback to date-based title
  const dateStr = new Date(date).toISOString().split('T')[0];
  return `Micro post from ${dateStr}`;
}

// Extract images from markdown content
function extractImages(content) {
  const images = [];

  // Markdown images: ![alt](url)
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    images.push(match[2]);
  }

  // HTML img tags
  const htmlImgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  while ((match = htmlImgRegex.exec(content)) !== null) {
    images.push(match[1]);
  }

  return images;
}

// Copy image file to export directory
function copyImage(imageUrl, imagesExportDir) {
  let localPath = null;

  // Handle different image URL formats
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    // External URL - extract path if it's from chrishannah.me
    if (imageUrl.includes('chrishannah.me')) {
      const urlPath = imageUrl.replace(/^https?:\/\/[^\/]+/, '');
      localPath = path.join(__dirname, 'static', urlPath.replace(/^\//, ''));
    } else {
      // External image, can't copy
      return imageUrl;
    }
  } else {
    // Relative path
    localPath = path.join(__dirname, imageUrl.replace(/^\//, ''));
  }

  if (localPath && fs.existsSync(localPath)) {
    const fileName = path.basename(localPath);
    const destPath = path.join(imagesExportDir, fileName);

    // Handle duplicate filenames
    let finalDestPath = destPath;
    let counter = 1;
    while (fs.existsSync(finalDestPath)) {
      const ext = path.extname(fileName);
      const base = path.basename(fileName, ext);
      finalDestPath = path.join(imagesExportDir, `${base}-${counter}${ext}`);
      counter++;
    }

    try {
      fs.copyFileSync(localPath, finalDestPath);
      return '__GHOST_URL__/content/images/' + path.basename(finalDestPath);
    } catch (e) {
      console.error(`   ⚠️  Could not copy image: ${localPath}`);
      return imageUrl;
    }
  }

  return imageUrl;
}

// Process images in content
function processContentImages(content, imagesExportDir) {
  const images = extractImages(content);
  let processedContent = content;

  images.forEach(imageUrl => {
    const newPath = copyImage(imageUrl, imagesExportDir);
    if (newPath !== imageUrl) {
      // Replace all occurrences of this image URL
      const escapedUrl = imageUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      processedContent = processedContent.replace(
        new RegExp(escapedUrl, 'g'),
        newPath
      );
    }
  });

  return processedContent;
}

// Get all markdown files recursively
function getMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip certain directories
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'templates') {
        getMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Check if post is a favourite/like post
function isFavouritePost(filePath, frontmatter) {
  const fileName = path.basename(filePath, '.md');

  // Check filename
  if (fileName.startsWith('favourite-') || fileName.startsWith('like-')) {
    return true;
  }

  // Check permalink
  if (frontmatter.permalink && frontmatter.permalink.includes('/favourite/')) {
    return true;
  }

  return false;
}

// Copy directory recursively
function copyDirectoryRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories but flatten to root
      copyDirectoryRecursive(srcPath, dest);
    } else if (entry.isFile() && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(entry.name)) {
      // Handle duplicate filenames
      let finalDestPath = destPath;
      let counter = 1;
      while (fs.existsSync(finalDestPath)) {
        const ext = path.extname(entry.name);
        const base = path.basename(entry.name, ext);
        finalDestPath = path.join(dest, `${base}-${counter}${ext}`);
        counter++;
      }
      try {
        fs.copyFileSync(srcPath, finalDestPath);
      } catch (e) {
        // Skip files that can't be copied
      }
    }
  }
}

// Convert post to Ghost format
function convertToGhostPost(filePath, id) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, content: body } = parseFrontmatter(content);

  // Skip favourite posts
  if (isFavouritePost(filePath, frontmatter)) {
    return null;
  }

  // Determine post type and status
  const layout = frontmatter.layout || '';

  // Parse tags - handle both array and string formats
  let tags = [];
  if (frontmatter.tags) {
    if (Array.isArray(frontmatter.tags)) {
      tags = frontmatter.tags;
    } else if (typeof frontmatter.tags === 'string') {
      // Try to parse as JSON first
      try {
        tags = JSON.parse(frontmatter.tags);
      } catch (e) {
        // Otherwise split by comma
        tags = frontmatter.tags.split(',').map(t => t.trim());
      }
    }
  }

  // Also include categories as tags
  if (frontmatter.categories) {
    const cats = Array.isArray(frontmatter.categories)
      ? frontmatter.categories
      : frontmatter.categories.split(',').map(c => c.trim());
    tags = [...tags, ...cats];
  }

  // Clean up tags: remove system tags, lowercase, remove brackets and quotes
  tags = tags
    .filter(t => t && !['post', 'micro', 'link'].includes(t.toLowerCase()))
    .map(t => {
      // Remove quotes and brackets
      let cleaned = t.replace(/["'\[\]]/g, '').trim();
      // Lowercase
      return cleaned.toLowerCase();
    })
    .filter(t => t.length > 0);

  // Add internal tag to hide from homepage
  tags.push('#migrated');

  // Parse date
  let publishedDate = new Date();
  if (frontmatter.date) {
    publishedDate = new Date(frontmatter.date);
  }

  // Get title
  let title = frontmatter.title || '';

  // Clean up title - remove quotes, empty strings, etc.
  if (title) {
    title = title.replace(/^["']|["']$/g, '').trim();
  }

  // For micro posts or posts without proper title, generate one
  if (!title || title === '' || title.toLowerCase() === 'untitled' || title === 'null') {
    if (layout.includes('micro') || !title) {
      title = generateMicroTitle(body, publishedDate);
    } else {
      title = 'Untitled Post';
    }
  }

  // Get slug
  let slug = frontmatter.permalink || '';
  slug = slug.replace(/^\//, '').replace(/\/$/, '');

  if (!slug && title) {
    slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // Process content - use as-is since it's already HTML or markdown
  let html = body.trim();

  // Process images in content
  html = processContentImages(html, CONFIG.imagesDir);

  // Remove footnotes
  html = removeFootnotes(html);

  // For link posts, add the link at the top
  if (frontmatter.link) {
    html = `<p><a href="${frontmatter.link}">${frontmatter.link}</a></p>\n\n${html}`;
  }

  // Handle featured image
  let featureImage = null;
  if (frontmatter.image) {
    featureImage = copyImage(frontmatter.image, CONFIG.imagesDir);
  }

  // Create Ghost post object
  const ghostPost = {
    id: id.toString(),
    title: title,
    slug: slug || `post-${id}`,
    mobiledoc: null,
    html: html,
    comment_id: id.toString(),
    feature_image: featureImage,
    featured: 0,
    type: 'post',
    status: 'published',
    locale: null,
    visibility: 'public', // Public but hidden from homepage via #migrated tag
    email_recipient_filter: 'none',
    created_at: publishedDate.toISOString(),
    updated_at: publishedDate.toISOString(),
    published_at: publishedDate.toISOString(),
    custom_excerpt: frontmatter.description || null,
    codeinjection_head: null,
    codeinjection_foot: null,
    custom_template: null,
    canonical_url: null
  };

  return { post: ghostPost, tags: tags };
}

// Split posts into chunks based on file size
function splitIntoChunks(posts, tagMap, maxSize) {
  const chunks = [];
  let currentChunk = {
    posts: [],
    posts_meta: [],
    tags: [],
    posts_tags: [],
    posts_authors: []
  };

  // Estimate size (rough estimation)
  let currentSize = 0;
  const baseSize = 1000; // Base JSON structure overhead

  for (const postData of posts) {
    const postSize = JSON.stringify(postData).length;

    // If adding this post would exceed max size, start new chunk
    if (currentSize + postSize > maxSize && currentChunk.posts.length > 0) {
      chunks.push(currentChunk);
      currentChunk = {
        posts: [],
        posts_meta: [],
        tags: [],
        posts_tags: [],
        posts_authors: []
      };
      currentSize = baseSize;
    }

    currentChunk.posts.push(postData.post);
    currentChunk.posts_authors.push(postData.author);
    currentChunk.posts_tags.push(...postData.postTags);
    currentSize += postSize;
  }

  // Add last chunk
  if (currentChunk.posts.length > 0) {
    chunks.push(currentChunk);
  }

  // Add tags to each chunk
  const allTags = Array.from(tagMap.values());
  chunks.forEach(chunk => {
    chunk.tags = allTags;
  });

  return chunks;
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting Ghost migration...\n');

  // Create export directories
  if (!fs.existsSync(CONFIG.exportDir)) {
    fs.mkdirSync(CONFIG.exportDir, { recursive: true });
  }
  if (!fs.existsSync(CONFIG.imagesDir)) {
    fs.mkdirSync(CONFIG.imagesDir, { recursive: true });
  }

  console.log('📁 Finding all posts...');
  const markdownFiles = getMarkdownFiles(CONFIG.postsDir);
  console.log(`   Found ${markdownFiles.length} markdown files\n`);

  // Initialize data structures
  const allPosts = [];
  const tagMap = new Map();
  let tagIdCounter = 1;
  let skippedCount = 0;

  console.log('📝 Converting posts and copying images...');
  let processedCount = 0;
  let postId = 1;

  for (const filePath of markdownFiles) {
    try {
      const result = convertToGhostPost(filePath, postId);

      if (!result) {
        // Post was skipped (favourite post)
        skippedCount++;
        continue;
      }

      const { post, tags } = result;

      // Process tags
      const postTags = [];
      tags.forEach(tagName => {
        if (tagName && tagName.trim()) {
          if (!tagMap.has(tagName)) {
            const tagId = tagIdCounter++;
            const tagSlug = tagName.startsWith('#')
              ? tagName.substring(1)
              : tagName.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

            tagMap.set(tagName, {
              id: tagId.toString(),
              name: tagName,
              slug: tagSlug,
              description: null,
              feature_image: null,
              visibility: tagName.startsWith('#') ? 'internal' : 'public',
              meta_title: null,
              meta_description: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          }

          const tag = tagMap.get(tagName);
          postTags.push({
            id: `${postId}-${tag.id}`,
            post_id: postId.toString(),
            tag_id: tag.id,
            sort_order: 0
          });
        }
      });

      // Add author relationship
      const author = {
        id: postId.toString(),
        post_id: postId.toString(),
        author_id: '1',
        sort_order: 0
      };

      allPosts.push({
        post,
        author,
        postTags
      });

      postId++;
      processedCount++;

      if (processedCount % 100 === 0) {
        console.log(`   Processed ${processedCount}/${markdownFiles.length - skippedCount} posts...`);
      }
    } catch (error) {
      console.error(`   ⚠️  Error processing ${filePath}:`, error.message);
    }
  }

  console.log(`   ✅ Processed ${processedCount} posts`);
  console.log(`   ⏭️  Skipped ${skippedCount} favourite posts\n`);

  // Copy static images
  console.log('🖼️  Copying static images...');
  if (fs.existsSync(CONFIG.staticDir)) {
    const staticImagesDir = path.join(CONFIG.staticDir, 'images');
    if (fs.existsSync(staticImagesDir)) {
      copyDirectoryRecursive(staticImagesDir, CONFIG.imagesDir);
      console.log(`   ✅ Copied images from static directory\n`);
    }
  }

  // Count images
  const imageFiles = fs.readdirSync(CONFIG.imagesDir).filter(f =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)
  );
  console.log(`   📸 Total images: ${imageFiles.length}\n`);

  // Create user object
  const user = {
    id: '1',
    name: 'Chris Hannah',
    slug: CONFIG.authorSlug,
    email: 'blog@chrishannah.me',
    profile_image: null,
    cover_image: null,
    bio: null,
    website: 'https://chrishannah.me',
    location: null,
    accessibility: null,
    status: 'active',
    locale: null,
    visibility: 'public',
    meta_title: null,
    meta_description: null,
    tour: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // Split into chunks
  console.log('📦 Splitting into chunks (max 100MB each)...');
  const chunks = splitIntoChunks(allPosts, tagMap, CONFIG.maxFileSize * 0.9); // 90% of max to be safe
  console.log(`   Created ${chunks.length} chunk(s)\n`);

  // Write each chunk
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const ghostData = {
      db: [{
        meta: {
          exported_on: Date.now(),
          version: CONFIG.ghostVersion
        },
        data: {
          posts: chunk.posts,
          posts_meta: [],
          tags: chunk.tags,
          posts_tags: chunk.posts_tags,
          users: [user],
          posts_authors: chunk.posts_authors
        }
      }]
    };

    const fileName = chunks.length > 1 ? `ghost-import-part${i + 1}.json` : 'ghost-import.json';
    const exportPath = path.join(CONFIG.exportDir, fileName);

    console.log(`💾 Writing ${fileName}...`);
    fs.writeFileSync(exportPath, JSON.stringify(ghostData, null, 2));

    const stats = fs.statSync(exportPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   ✅ Saved ${fileName} (${sizeMB} MB)\n`);
  }

  // Print summary
  console.log('📊 Migration Summary:');
  console.log(`   Posts: ${processedCount}`);
  console.log(`   Skipped: ${skippedCount} (favourites)`);
  console.log(`   Tags: ${tagMap.size}`);
  console.log(`   Images: ${imageFiles.length}`);
  console.log(`   Author: ${CONFIG.authorSlug}`);
  console.log(`   Export files: ${chunks.length}`);
  console.log(`   Export location: ${CONFIG.exportDir}`);
  console.log('\n✨ Migration complete!\n');
  console.log('📦 Next steps:');
  console.log('   1. Create a ZIP of the ghost-export directory');
  console.log('   2. In Ghost Admin, go to Settings → Labs → Import content');
  console.log('   3. Upload the ZIP file');
  console.log('   4. Ghost will import posts, tags, and images');
  console.log('\n📌 Important notes:');
  console.log('   - All posts are tagged with #migrated (internal tag)');
  console.log('   - To hide from homepage, filter out posts with #migrated tag in your theme');
  console.log('   - Favourite posts were excluded from migration');
  console.log('   - Footnotes have been removed from all posts');
  console.log('   - All tags are lowercase without brackets or quotes');
  console.log(`   - ${imageFiles.length} images copied to content/images directory\n`);
}

// Run migration
migrate().catch(console.error);

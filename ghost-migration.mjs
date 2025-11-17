#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import MarkdownIt from 'markdown-it';
import footnote from 'markdown-it-footnote';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize markdown parser
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(footnote);

// Configuration
const CONFIG = {
  postsDir: path.join(__dirname, 'posts'),
  staticDir: path.join(__dirname, 'static'),
  exportDir: path.join(__dirname, 'ghost-export'),
  imagesDir: path.join(__dirname, 'ghost-export', 'images'),
  siteDomain: 'https://chrishannah.me',
  ghostVersion: '5.0.0'
};

// Simple frontmatter parser
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
    // Check for array notation
    if (line.trim().startsWith('[') && line.trim().endsWith(']')) {
      // JSON array format
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        try {
          frontmatter[key] = JSON.parse(value);
        } catch (e) {
          frontmatter[key] = value;
        }
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
        frontmatter[currentKey] = value;
        currentKey = null;
        currentValue = [];
        inArray = false;
      } else {
        currentValue = [];
        inArray = true;
      }
    } else if (currentKey && line.trim().startsWith('-')) {
      // Array item
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

// Extract images from markdown content
function extractImages(content, baseUrl) {
  const images = [];
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    const imageUrl = match[2];
    images.push(imageUrl);
  }

  // Also check for HTML img tags
  const htmlImgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  while ((match = htmlImgRegex.exec(content)) !== null) {
    const imageUrl = match[1];
    images.push(imageUrl);
  }

  return images;
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

    fs.copyFileSync(localPath, finalDestPath);
    return path.basename(finalDestPath);
  }

  return imageUrl;
}

// Process images in content
function processContentImages(content, imagesExportDir) {
  const images = extractImages(content);
  const imageMap = new Map();

  images.forEach(imageUrl => {
    const newPath = copyImage(imageUrl, imagesExportDir);
    imageMap.set(imageUrl, newPath);
  });

  // Replace image URLs in content
  let processedContent = content;
  imageMap.forEach((newPath, oldUrl) => {
    // Only replace if it's not an external URL or if we successfully copied it
    if (!newPath.startsWith('http')) {
      processedContent = processedContent.replace(
        new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        `__GHOST_URL__/content/images/${newPath}`
      );
    }
  });

  return processedContent;
}

// Convert post to Ghost format
function convertToGhostPost(filePath, id) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, content: body } = parseFrontmatter(content);

  // Determine post type and status
  let postType = 'post';
  const layout = frontmatter.layout || '';

  // Parse tags
  let tags = [];
  if (frontmatter.tags) {
    if (Array.isArray(frontmatter.tags)) {
      tags = frontmatter.tags;
    } else if (typeof frontmatter.tags === 'string') {
      tags = frontmatter.tags.split(',').map(t => t.trim());
    }
  }

  // Also include categories as tags
  if (frontmatter.categories) {
    const cats = Array.isArray(frontmatter.categories)
      ? frontmatter.categories
      : frontmatter.categories.split(',').map(c => c.trim());
    tags = [...tags, ...cats];
  }

  // Remove 'post', 'micro', 'link' from tags as these are content types
  tags = tags.filter(t => !['post', 'micro', 'link'].includes(t));

  // Parse date
  let publishedDate = new Date();
  if (frontmatter.date) {
    publishedDate = new Date(frontmatter.date);
  }

  // Get title
  let title = frontmatter.title || '';

  // For micro posts without title, generate one from content or date
  if (!title && layout.includes('micro')) {
    const plainText = body.replace(/<[^>]*>/g, '').trim();
    title = plainText.substring(0, 50) + (plainText.length > 50 ? '...' : '');
    if (!title) {
      title = `Micro post from ${publishedDate.toISOString().split('T')[0]}`;
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

  // Process content
  let html = body;

  // Convert markdown to HTML if needed
  if (!body.startsWith('<')) {
    html = md.render(body);
  }

  // Process images
  html = processContentImages(html, CONFIG.imagesDir);

  // Handle featured image
  let featureImage = null;
  if (frontmatter.image) {
    const copiedImage = copyImage(frontmatter.image, CONFIG.imagesDir);
    if (!copiedImage.startsWith('http')) {
      featureImage = `__GHOST_URL__/content/images/${copiedImage}`;
    } else {
      featureImage = copiedImage;
    }
  }

  // For link posts, add the link at the top
  if (frontmatter.link) {
    html = `<p><a href="${frontmatter.link}">${frontmatter.link}</a></p>\n\n${html}`;
  }

  // Create Ghost post object
  const ghostPost = {
    id: id.toString(),
    title: title || 'Untitled',
    slug: slug || `post-${id}`,
    mobiledoc: null,
    html: html,
    comment_id: id.toString(),
    feature_image: featureImage,
    featured: 0,
    type: 'post',
    status: 'published',
    locale: null,
    visibility: 'public',
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

  // Initialize Ghost export structure
  const ghostData = {
    db: [{
      meta: {
        exported_on: Date.now(),
        version: CONFIG.ghostVersion
      },
      data: {
        posts: [],
        posts_meta: [],
        tags: [],
        posts_tags: [],
        users: [{
          id: '1',
          name: 'Chris Hannah',
          slug: 'chris',
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
        }],
        posts_authors: []
      }
    }]
  };

  const tagMap = new Map();
  let tagIdCounter = 1;

  console.log('📝 Converting posts...');
  let processedCount = 0;

  for (let i = 0; i < markdownFiles.length; i++) {
    const filePath = markdownFiles[i];
    const postId = i + 1;

    try {
      const { post, tags } = convertToGhostPost(filePath, postId);
      ghostData.db[0].data.posts.push(post);

      // Add author relationship
      ghostData.db[0].data.posts_authors.push({
        id: postId.toString(),
        post_id: postId.toString(),
        author_id: '1',
        sort_order: 0
      });

      // Process tags
      tags.forEach(tagName => {
        if (tagName && tagName.trim()) {
          if (!tagMap.has(tagName)) {
            const tagId = tagIdCounter++;
            tagMap.set(tagName, tagId);

            ghostData.db[0].data.tags.push({
              id: tagId.toString(),
              name: tagName,
              slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
              description: null,
              feature_image: null,
              visibility: 'public',
              meta_title: null,
              meta_description: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          }

          const tagId = tagMap.get(tagName);
          ghostData.db[0].data.posts_tags.push({
            id: `${postId}-${tagId}`,
            post_id: postId.toString(),
            tag_id: tagId.toString(),
            sort_order: 0
          });
        }
      });

      processedCount++;
      if (processedCount % 100 === 0) {
        console.log(`   Processed ${processedCount}/${markdownFiles.length} posts...`);
      }
    } catch (error) {
      console.error(`   ⚠️  Error processing ${filePath}:`, error.message);
    }
  }

  console.log(`   ✅ Processed ${processedCount} posts\n`);

  // Write Ghost import file
  console.log('💾 Writing Ghost import file...');
  const exportPath = path.join(CONFIG.exportDir, 'ghost-import.json');
  fs.writeFileSync(exportPath, JSON.stringify(ghostData, null, 2));
  console.log(`   ✅ Saved to: ${exportPath}\n`);

  // Copy static images
  console.log('🖼️  Copying static images...');
  if (fs.existsSync(CONFIG.staticDir)) {
    const staticImagesDir = path.join(CONFIG.staticDir, 'images');
    if (fs.existsSync(staticImagesDir)) {
      copyDirectoryRecursive(staticImagesDir, CONFIG.imagesDir);
      console.log(`   ✅ Copied images from static directory\n`);
    }
  }

  // Print summary
  console.log('📊 Migration Summary:');
  console.log(`   Posts: ${ghostData.db[0].data.posts.length}`);
  console.log(`   Tags: ${ghostData.db[0].data.tags.length}`);
  console.log(`   Export location: ${CONFIG.exportDir}`);
  console.log('\n✨ Migration complete!\n');
  console.log('📦 Next steps:');
  console.log('   1. Create a ZIP file of the ghost-export directory');
  console.log('   2. In Ghost Admin, go to Settings → Labs → Import content');
  console.log('   3. Upload the ZIP file');
  console.log('   4. Ghost will import all posts, tags, and images\n');
}

// Helper function to copy directory recursively
function copyDirectoryRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectoryRecursive(srcPath, dest); // Flatten directory structure
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
      fs.copyFileSync(srcPath, finalDestPath);
    }
  }
}

// Run migration
migrate().catch(console.error);

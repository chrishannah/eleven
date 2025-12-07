# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Eleventy (11ty) v3, configured as an ES module. The site generates static HTML from Markdown posts and Nunjucks templates, outputting to the `public/` directory.

## Build Commands

```bash
# Development server with live reload
npm run dev

# Development server (basic)
npm start

# Production build
npm run build

# Create new blog post
./new_post.sh "Post Title"
```

The `new_post.sh` script creates a new Markdown file in `posts/YYYY/MM/` with proper frontmatter and opens it in Neovim.

## Architecture

### Content Structure

Posts are organized by year and month in `posts/YYYY/MM/` and support multiple content types via tags:
- `post` - Standard blog posts
- `micro` - Short-form microblog posts
- `link` - Link posts to external content
- `essay` - Long-form essays
- `quote` - Quote posts

Each content type has a corresponding layout template in `_includes/layouts/` and partial in `_includes/partials/`.

### Configuration Files

Custom filters are modularized in the `config/` directory:
- `config/date.js` - Date formatting using moment.js
- `config/number.js` - Number formatting utilities
- `config/post.js` - Post content filters (microExcerpt, cleanUrl)

All filters are imported and registered in `eleventy.config.js`.

### Key Eleventy Features

**Collections**: The "all" collection filters for markdown files excluding pages (line 55-61 in eleventy.config.js).

**Draft Posts**: Posts with `draft: true` in frontmatter are excluded via the `excludeDrafts` filter.

**Table of Contents**: The `toc` filter generates TOC HTML from h1-h4 headers in content.

**OG Images**: Generated on production builds only (`ELEVENTY_ENV !== 'development'`) using eleventy-plugin-og-image with Helvetica font.

**Markdown**: Uses markdown-it with markdown-it-footnote plugin for footnote support.

### Micropub API

The `api/` directory contains a Micropub implementation for posting to the blog remotely:
- `micropub.mjs` - Main endpoint handling POST (create) and GET (config) requests
- `buildPostContent.mjs` - Generates Markdown frontmatter and content
- `createFileInGitHub.mjs` - Commits new posts to GitHub
- `validateToken.mjs` - IndieAuth token validation
- Supports "like-of" posts that send webmentions

Deployed as serverless functions (see `api/vercel.json`).

### Blog Editor

The `blog-editor/` directory contains a separate Next.js application for editing blog posts via a web interface. It's a standalone React app using Chakra UI.

### Static Assets

- `static/` - Static files (fonts, images, videos, cv, etc.) copied to output
- `assets/js/` - JavaScript files copied to `public/js/`
- Images in `posts/**/*.{jpg,jpeg,png,gif}` are copied to output alongside posts

### Template Structure

- `_includes/layouts/base.njk` - Base layout template
- `_includes/layouts/*.njk` - Content-type-specific layouts (post, micro, link, quote, page)
- `_includes/partials/*.njk` - Reusable content partials for different post types
- `_includes/header.njk`, `footer.njk`, `nav.njk` - Site structure components
- `pages/*.njk` - Static pages (about, archive, contact, etc.)
- `rss/*.njk` - RSS feed templates

### RSS Feeds

Multiple RSS feeds are generated from templates in `rss/`:
- Main feed, posts feed, essays feed, micro feed
- Uses @11ty/eleventy-plugin-rss

## Content Frontmatter

Standard post frontmatter structure:
```yaml
---
title: Post Title
date: YYYY-MM-DD
tags:
  - post
layout: layouts/post
permalink: slug-here/
---
```

Optional fields:
- `draft: true` - Excludes from public collections
- `categories: ["Category"]` - Grouping posts by category

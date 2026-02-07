# CLAUDE.md

## Project Overview

Personal blog built with Eleventy (11ty) v3, configured as an ES module. Uses the **Signal Station** theme — a dark, monospace command-center design. Outputs static HTML to `public/`, deployed via Vercel from `master`.

## Build Commands

```bash
npm run dev        # Dev server with live reload
npm start          # Dev server (basic)
npm run build      # Production build
./new_post.sh "Post Title"  # Create new post (opens in Neovim)
```

## Architecture

### Signal Station Theme

Two layout paths:
- **Homepage** — `_includes/layouts/home-signal.njk` with 15 partials in `_includes/partials/signal/`
- **Content pages** — `_includes/layouts/base.njk` with shared header/footer

Homepage layout (`home-signal.njk`):
- Header: brand, status, volume, issue, since
- Main grid: latest writing, curated links, recent essays (left) | Instagram photo, live activity, projects, external sites, connect, blogroll (right)
- Bottom grid: stats, milestones, system
- Footer: post count, next milestone

### Theme System

Dark/light/auto via CSS custom properties and `data-theme` attribute on `<html>`.
- `theme.js` reads `localStorage('theme-preference')`, sets `data-theme`, highlights active toggle button
- Inline script in `<head>` prevents flash of wrong theme
- CSS vars: `--bg`, `--text`, `--text-muted`, `--accent` (#ff8000), `--border`, `--success`, `--hover-bg`, `--code-bg`

### CSS Files (inlined via Nunjucks `{% include %}`)

| File | Purpose |
|------|---------|
| `assets/css/signal-station.css` | Homepage layout, grid, header, nav, footer, stats |
| `assets/css/signal-content.css` | Article typography, forms, archive, pagination, 404 |
| `assets/css/highlight.css` | Code syntax highlighting |
| `assets/css/lightbox.css` | Image lightbox overlay |
| `assets/css/tinylytics.css` | Tinylytics widget styling |

### Client-Side JS (`assets/js/` → copied to `public/js/`)

| File | Purpose |
|------|---------|
| `live-activity.js` | Fetches GitHub commits, Tinylytics page views/kudos, computes last deploy relative time |
| `theme.js` | Theme toggle handler |
| `highlight.js` | Code highlighting (loaded conditionally) |
| `lightbox.js` | Image lightbox (loaded conditionally) |

### Fonts

- **JetBrains Mono** (Google Fonts) — UI, headings, nav, code
- **Fraunces** (Google Fonts) — body text in articles
- **IBM Plex Sans** — secondary UI font

### Content Structure

Posts in `posts/YYYY/MM/` with tags for content types:
- `post` — standard blog posts
- `micro` — short-form microblog
- `link` — link posts to external content
- `essay` — long-form essays
- `quote` — quote posts
- `photography` — photo posts

Frontmatter:
```yaml
---
title: Post Title
date: YYYY-MM-DD
tags:
  - post
layout: layouts/post
permalink: slug-here/
draft: true  # optional, excludes from collections
categories: ["Category"]  # optional
---
```

### Collections (`eleventy.config.js`)

- `all` — all markdown files excluding pages
- `essay` — filtered by tag
- `link` — filtered by tag
- `micro` — filtered by tag
- `photography` — filtered by tag

### Data Files (`_data/`)

| File | Purpose |
|------|---------|
| `homepage.json` | Tagline, status, since year, current focus, system status, Instagram config |
| `projects.json` | Projects list for homepage sidebar |
| `social.json` | Social media links |
| `external.json` | External sites for homepage sidebar |
| `instagram.js` | Fetches latest photo from Behold.so API |
| `build.js` | Exports build timestamp for deploy time display |
| `site.json` | Site title, URL |
| `author.json` | Author info |
| `env.js` | Environment variables |

### Config Files (`config/`)

| File | Filters |
|------|---------|
| `config/date.js` | Date formatting (moment.js) |
| `config/number.js` | Number formatting |
| `config/post.js` | Post content filters (microExcerpt, cleanUrl) |
| `config/stats.js` | Stats: daysPublishing, postsThisMonth, postsThisYear, daysSinceLastPost, volumeNumber, thousands, nextMilestone, longestStreak, bestMonth |

### RSS Feeds (`rss/`)

- `/feed/index.xml` — all posts
- `/feed/posts/index.xml` — posts tagged `post`
- `/feed/essays/index.xml` — essays
- `/feed/micro/index.xml` — micro posts

### OG Image Generator

`api/og.mjs` — Vercel serverless function generating PNG OG images using satori + resvg. Uses JetBrains Mono font, dark background (#0a0a0a), orange accent for author name.

### Micropub API (`api/`)

Micropub implementation for remote posting:
- `micropub.mjs` — POST (create) and GET (config)
- `buildPostContent.mjs` — Markdown frontmatter generation
- `createFileInGitHub.mjs` — Commits to GitHub
- `validateToken.mjs` — IndieAuth token validation

### Blog Editor (`blog-editor/`)

Standalone Next.js app for editing posts via web interface (Chakra UI).

### Static Assets

`static/` subfolders copied to output: text-shot, 2020, cv, prntsc, fonts, images, videos.

### Development Mode

When `ELEVENTY_ENV=development`, old posts (>2 years) are ignored to speed up builds.

## Deploy

Vercel auto-deploys from `master`. Push to `master` triggers production build.

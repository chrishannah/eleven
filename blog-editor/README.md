# Blog Post Editor

A local web application for creating and editing blog posts for your 11ty site. This editor provides a user-friendly interface for writing blog posts with markdown preview and automatically generates the correct frontmatter format.

## Features

- Real-time markdown preview
- Tag and category management
- Automatic frontmatter generation
- Automatic file naming and organization
- Completely offline capable
- Modern, responsive UI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Fill in the blog post details:
   - Title (required)
   - Date (auto-filled with current date/time)
   - Categories (optional)
   - Tags (optional)
   - Content (required)

2. Use the preview panel on the right to see how your markdown will be rendered

3. Click "Save Post" to save your blog post

The post will be automatically saved in your 11ty posts directory with the correct folder structure (year/month) and proper frontmatter formatting.

## File Structure

Posts are saved following this structure:
```
posts/
  YYYY/
    MM/
      your-post-title.md
```

## Development

This is a [Next.js](https://nextjs.org/) project using:
- Chakra UI for the interface
- React Markdown for preview
- date-fns for date handling
- YAML for frontmatter generation

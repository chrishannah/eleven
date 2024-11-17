const { Octokit } = require("@octokit/rest");

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    return handleCreate(req, res);
  } else if (req.method === 'GET') {
    return handleQuery(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
};

async function handleCreate(req, res) {
  const { type, properties } = req.body;

  if (type[0] !== 'h-entry') {
    return res.status(400).json({ error: 'Invalid entry type' });
  }

  const content = properties.content[0];
  const title = properties.name ? properties.name[0] : '';
  const date = new Date().toISOString();
  const slug = properties.slug ? properties.slug[0] : slugify(title ||'untitled');
  const requestTags = properties.category || [];
  const tags = [...new Set(['post', ...requestTags])];
  const fileName = `${date.split('T')[0]}-${slugify(title || 'untitled')}.md`;
  const fileContent = `---
layout: layouts/post
title: "${title}"
date: ${date}
permalink: ${slug}/
tags:
${tags.map(tag => `  - ${tag}`).join('\n')}
---
${content}`;

  try {
    await createFileInGitHub(fileName, fileContent);
    res.status(201).json({ success: true, url: `https://chrishannah.me/posts/${fileName}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
}

function handleQuery(req, res) {
  if (req.query.q === 'config') {
    res.status(200).json({
      "media-endpoint": "https://chrishannah.me/api/media",
      "syndicate-to": []
    });
  } else {
    res.status(400).json({ error: 'Invalid query' });
  }
}

async function createFileInGitHub(fileName, content) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  await octokit.repos.createOrUpdateFileContents({
    owner: 'chrishannah',
    repo: 'eleven',
    path: `src/posts/${fileName}`,
    message: `Add new post: ${fileName}`,
    content: Buffer.from(content).toString('base64'),
    branch: 'main'
  });
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

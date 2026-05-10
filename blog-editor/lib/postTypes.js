// Post type schema. Each type defines: label, layout, default tags & categories,
// any extra fields beyond the basics, and whether the title is required.
// generateFrontmatter() consumes the schema + form data and returns a YAML
// frontmatter object (key order matters, so we build manually).

export const POST_TYPES = {
  post: {
    label: 'Post',
    layout: 'layouts/post',
    defaultTags: ['post'],
    defaultCategories: [],
    titleRequired: true,
    fields: [],
  },
  essay: {
    label: 'Essay',
    layout: 'layouts/post',
    defaultTags: ['post', 'essay'],
    defaultCategories: ['essay'],
    titleRequired: true,
    fields: [
      { key: 'summary', label: 'Summary', type: 'textarea', placeholder: 'One-sentence summary' },
    ],
  },
  micro: {
    label: 'Micro',
    layout: 'layouts/micro',
    defaultTags: ['post', 'micro'],
    defaultCategories: [],
    titleRequired: false,
    fields: [],
  },
  link: {
    label: 'Link',
    layout: 'layouts/link',
    defaultTags: ['link'],
    defaultCategories: ['link'],
    titleRequired: true,
    fields: [
      { key: 'link', label: 'External URL', type: 'url', required: true, placeholder: 'https://…' },
      { key: 'source', label: 'Source (optional)', type: 'text', placeholder: 'e.g. Author or site name' },
    ],
  },
  quote: {
    label: 'Quote',
    layout: 'layouts/quote',
    defaultTags: ['quote', 'post'],
    defaultCategories: ['quote'],
    titleRequired: false,
    fields: [
      { key: 'attribution', label: 'Attribution', type: 'text', placeholder: 'Speaker / author' },
      { key: 'quoteSource', label: 'Source (optional)', type: 'text', placeholder: 'Book, talk, URL…' },
    ],
  },
  music: {
    label: 'Music',
    layout: 'layouts/music',
    defaultTags: ['music'],
    defaultCategories: [],
    titleRequired: true,
    fields: [
      { key: 'artist', label: 'Artist', type: 'text', required: true },
      { key: 'artwork', label: 'Artwork path', type: 'text', placeholder: '/posts/YYYY/MM/cover.jpg' },
      { key: 'musicUrl', label: 'Music URL (album.link, etc)', type: 'url' },
    ],
  },
  photography: {
    label: 'Photography',
    layout: 'layouts/post',
    defaultTags: ['post', 'photography'],
    defaultCategories: [],
    titleRequired: true,
    fields: [
      { key: 'image', label: 'Hero image', type: 'text', placeholder: '/images/YYYY/MM/photo.jpg' },
    ],
  },
};

export const POST_TYPE_LIST = Object.entries(POST_TYPES).map(([key, t]) => ({ key, ...t }));

const yamlString = (s) => {
  if (s == null) return '""';
  // Always quote — keeps us safe with colons, quotes, leading dashes, etc.
  return JSON.stringify(String(s));
};

const yamlList = (arr) =>
  arr.length === 0 ? '[]' : `[${arr.map(yamlString).join(', ')}]`;

export function buildFrontmatter(formData) {
  const type = POST_TYPES[formData.postType] || POST_TYPES.post;

  const tags = Array.from(new Set([...(type.defaultTags || []), ...(formData.tags || [])]));
  const categories = Array.from(
    new Set([...(type.defaultCategories || []), ...(formData.categories || [])]),
  );

  const lines = ['---'];
  if (formData.title) lines.push(`title: ${yamlString(formData.title)}`);
  if (formData.date) lines.push(`date: ${formData.date}`);
  lines.push(`layout: ${type.layout}`);
  if (formData.slug) lines.push(`permalink: ${formData.slug}/`);
  lines.push(`tags: ${yamlList(tags)}`);
  if (categories.length) lines.push(`categories: ${yamlList(categories)}`);
  if (formData.excerpt) lines.push(`excerpt: ${yamlString(formData.excerpt)}`);
  if (formData.featuredImage) lines.push(`featuredImage: ${yamlString(formData.featuredImage)}`);

  for (const field of type.fields) {
    const v = formData[field.key];
    if (v != null && v !== '') {
      lines.push(`${field.key}: ${yamlString(v)}`);
    }
  }

  if (formData.isDraft) lines.push('draft: true');
  lines.push('---');
  return lines.join('\n');
}

export function buildMarkdown(formData) {
  return `${buildFrontmatter(formData)}\n\n${formData.content || ''}`;
}

export function slugify(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function autoExcerpt(content) {
  if (!content) return '';
  const stripped = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/^#+\s.*$/gm, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[*_`>]+/g, '')
    .trim();
  const firstPara = stripped.split(/\n\s*\n/)[0] || '';
  return firstPara.replace(/\s+/g, ' ').slice(0, 240);
}

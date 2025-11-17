# Ghost Migration Export

This directory contains a complete export of your 11ty blog ready for import into Ghost.

## 📊 Migration Summary

**Content Migrated:**
- **1,180 posts** (blog posts, micro posts, link posts, photo posts, quotes, etc.)
  - 2 favourite posts excluded
- **473 unique tags** (derived from post tags and categories)
  - All lowercase, no brackets or quotes
  - System tags ('post', 'micro', 'link') filtered out
- **1,550 images** (all locally stored images from your blog)
  - Featured images included
  - Images embedded in posts
  - All images from static/images directory
- **1 author** (Chris Hannah, slug: 'chris')
- **All metadata** including:
  - Publication dates
  - Post excerpts/descriptions
  - Custom permalinks (converted to slugs)
  - Post types and layouts
  - Intelligent titles for micro posts

## 📦 What's Included

### Files Generated

1. **`ghost-import.zip`** (1.8 GB)
   - This is the main file you'll import into Ghost
   - Contains the JSON export and all 1,550 images
   - Ready for direct upload to Ghost

2. **`ghost-export/`** directory contains:
   - `ghost-import.json` - The Ghost-compatible JSON export (4.02 MB)
   - `content/images/` - All 1,550 images from your blog
   - If multiple JSON files: `ghost-import-part1.json`, `ghost-import-part2.json`, etc.

## 🚀 How to Import into Ghost

### Step 1: Prepare Your Ghost Instance
Make sure you have a Ghost blog set up (either self-hosted or Ghost.com).

### Step 2: Import the Content

1. Log into your Ghost Admin panel
2. Navigate to **Settings → Labs**
3. Scroll down to **Import content**
4. Click **Import content**
5. Upload `ghost-import.zip` (contains both JSON and all images)
6. Wait for the import to complete (may take a few minutes due to size)

**Alternative:** If you have multiple JSON files, you can upload them individually:
- Upload `ghost-export/ghost-import.json` (or part1, part2, etc.)
- Images will be included automatically from the content/images directory

### Step 3: Verify the Import

After import, Ghost will show you a summary. Verify:
- All 1,180 posts were imported
- Tags are properly assigned (all lowercase)
- Dates are correct
- Micro posts have appropriate titles

### Step 4: Hide Migrated Posts from Homepage

All imported posts are tagged with `#migrated` (an internal tag). To hide them from your homepage:

**Option 1: Theme Code (Recommended)**
Edit your theme's `index.hbs` or home template to filter out posts with the `#migrated` tag:

```handlebars
{{#get "posts" filter="tag:-hash-migrated" limit="15"}}
  {{#foreach posts}}
    <!-- Your post card template -->
  {{/foreach}}
{{/get}}
```

**Option 2: Manual Selection**
- Remove the `#migrated` tag from posts you want to appear on the homepage
- Keep the tag on posts that should remain hidden

## 📝 Content Type Mapping

Your 11ty blog content was mapped to Ghost as follows:

| 11ty Type | Ghost Type | Notes |
|-----------|------------|-------|
| Regular posts | Posts | Standard blog posts with titles |
| Micro posts | Posts | Short-form content (auto-generated titles if missing) |
| Link posts | Posts | External link included at top of content |
| Photo posts | Posts | Images embedded in content |
| Quotes | Posts | Quote content preserved |
| Pages | Posts | All content imported as posts (you can convert to pages in Ghost) |

## 🖼️ Image Handling

**All images are included in this export!**

**Images Included:**
- **1,550 images** copied from your blog
- Images are referenced using Ghost's `__GHOST_URL__` placeholder
- Ghost will automatically update these to the correct URLs on import

**What's Copied:**
- Featured images (135 posts have featured images)
- Images embedded in post content
- All images from the `static/images/` directory
- Images from posts directories

**Image Processing:**
- All image URLs are automatically converted to Ghost format
- Duplicate image filenames are handled automatically
- Images are stored in `ghost-export/content/images/` directory
- On import, Ghost will place them in the correct location

## 🏷️ Tags

**Total Tags: 473**

Tags were created from:
- Post `tags` arrays from frontmatter
- Post `categories` from frontmatter
- System tags like 'post', 'micro', 'link' were filtered out

**Tag Formatting:**
- All tags are **lowercase**
- No brackets, quotes, or special characters
- Properly slugified for Ghost

**Special Tags:**
- `#migrated` - Internal tag added to all posts to hide from homepage

## ✅ What Works Automatically

After import, the following will work automatically:
- ✅ All post content (HTML preserved)
- ✅ Post dates and times
- ✅ Tags and tag relationships (all lowercase, properly formatted)
- ✅ Post slugs (URLs)
- ✅ Published status (all posts imported as published)
- ✅ Author attribution (slug: 'chris')
- ✅ Intelligent titles for micro posts
- ✅ Posts hidden from homepage via `#migrated` tag
- ✅ Footnotes removed
- ✅ Favourite posts excluded
- ✅ **All 1,550 images** imported and linked correctly
- ✅ **Featured images** set automatically
- ✅ **Images in content** work out of the box

## ⚠️ Manual Adjustments Needed

You may want to manually adjust:

1. **Homepage Visibility**: Configure your theme to filter out `#migrated` tag (see Step 4 above)
2. **Post Selection**: Remove `#migrated` tag from posts you want on the homepage
3. **Post Types**: Some content might be better as Ghost "pages" rather than posts
4. **Custom Excerpts**: Only posts with explicit `description` fields have excerpts

## 🔧 Technical Details

**Ghost Version:** 5.0.0 (compatible with Ghost 5.x and newer)

**Data Structure:**
- Export follows Ghost's official import/export format
- Uses HTML content (not Mobiledoc or Lexical)
- All dates in ISO 8601 format
- Image paths use Ghost's content API structure

## 📌 Post-Import Checklist

- [ ] Verify post count (should be 1,180)
- [ ] Check a few sample posts to ensure formatting is correct
- [ ] Verify images are displaying correctly (all 1,550 should be imported)
- [ ] Check that featured images appear on posts
- [ ] Verify tags are all lowercase and properly formatted
- [ ] Configure theme to hide `#migrated` posts from homepage
- [ ] Select posts to appear on homepage (remove `#migrated` tag)
- [ ] Check that micro posts have appropriate titles
- [ ] Set up any Ghost-specific features (newsletters, memberships, etc.)
- [ ] Configure your theme and design
- [ ] Set up redirects from old URLs to new ones (if needed)

## 🆘 Troubleshooting

**Import fails:**
- Make sure you're using Ghost 5.x or newer
- Check that the ZIP file uploaded completely (it's 1.8 GB)
- If upload fails, try uploading just the JSON file without images
- If you have multiple JSON parts, import them in order

**Images not showing:**
- Ghost should automatically handle the `__GHOST_URL__` placeholder
- If images don't appear, check the Ghost content/images directory
- All images are included in the ZIP file
- Make sure the ZIP file uploaded completely

**Posts appearing on homepage:**
- Edit your theme to filter out posts with `#migrated` tag
- See "Step 4: Hide Migrated Posts from Homepage" above

**Duplicate content:**
- If you need to re-import, delete all content first in Ghost Admin
- Ghost doesn't automatically deduplicate on import

**Tags not right:**
- All tags should be lowercase now
- If you see uppercase tags, re-run the migration script

## 📚 Additional Resources

- [Ghost Import Documentation](https://ghost.org/docs/migration/)
- [Ghost Content API](https://ghost.org/docs/content-api/)
- [Ghost Admin Guide](https://ghost.org/help/)

## 🎉 Success!

Your blog is now ready to import into Ghost! This migration includes:
- **1,180 posts** from 12+ years of blogging (2013-2025)
- All content types from your 11ty blog
- **473 properly formatted tags** (all lowercase)
- **1,550 images** (all locally stored media from your site)
- Complete metadata and relationships
- **Intelligent micro post titles**
- **Footnotes removed** for cleaner content
- **Favourite posts excluded**
- **Posts hidden from homepage** via `#migrated` tag

Good luck with your Ghost blog!

## 🔧 Re-running the Migration

If you need to regenerate the export:

```bash
node ghost-migration.mjs
```

This will create a fresh export with all the latest fixes.

---

*Generated by ghost-migration.mjs on ${new Date().toISOString()}*

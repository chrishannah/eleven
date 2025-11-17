# Ghost Migration Export

This directory contains a complete export of your 11ty blog ready for import into Ghost.

## 📊 Migration Summary

**Content Migrated:**
- **1,180 posts** (blog posts, micro posts, link posts, photo posts, quotes, etc.)
  - 2 favourite posts excluded
- **473 unique tags** (derived from post tags and categories)
  - All lowercase, no brackets or quotes
  - System tags ('post', 'micro', 'link') filtered out
- **1 author** (Chris Hannah, slug: 'chris')
- **All metadata** including:
  - Publication dates
  - Post excerpts/descriptions
  - Custom permalinks (converted to slugs)
  - Post types and layouts
  - Intelligent titles for micro posts

## 📦 What's Included

### Files Generated

1. **`ghost-export/`** directory contains:
   - `ghost-import.json` - The Ghost-compatible JSON export (4.01 MB)
   - **Note:** Images are NOT included in this export to keep file size manageable
   - If multiple files: `ghost-import-part1.json`, `ghost-import-part2.json`, etc.

## 🚀 How to Import into Ghost

### Step 1: Prepare Your Ghost Instance
Make sure you have a Ghost blog set up (either self-hosted or Ghost.com).

### Step 2: Import the Content

1. Log into your Ghost Admin panel
2. Navigate to **Settings → Labs**
3. Scroll down to **Import content**
4. Click **Import content**
5. Upload `ghost-export/ghost-import.json`
6. Wait for the import to complete

If you have multiple files (ghost-import-part1.json, etc.), import them one at a time in order.

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

**Images are NOT included in this export** to keep file sizes manageable and importable into Ghost.

**Image URLs in posts:**
- Images remain referenced with their original URLs (e.g., `https://chrishannah.me/images/...`)
- These will continue to work as long as your current site remains online
- If you want to migrate images, you'll need to:
  1. Download images from your current site
  2. Re-upload them to Ghost
  3. Update post content with new URLs

**Featured Images:**
- Not included in this export
- You can manually set featured images in Ghost after import

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

## ⚠️ Manual Adjustments Needed

You may want to manually adjust:

1. **Homepage Visibility**: Configure your theme to filter out `#migrated` tag (see Step 4 above)
2. **Post Selection**: Remove `#migrated` tag from posts you want on the homepage
3. **Images**: Images reference original URLs - migrate manually if needed
4. **Featured Images**: Set featured images manually in Ghost if desired
5. **Post Types**: Some content might be better as Ghost "pages" rather than posts
6. **Custom Excerpts**: Only posts with explicit `description` fields have excerpts

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
- [ ] Verify tags are all lowercase and properly formatted
- [ ] Configure theme to hide `#migrated` posts from homepage
- [ ] Select posts to appear on homepage (remove `#migrated` tag)
- [ ] Check that micro posts have appropriate titles
- [ ] Verify images are displaying (they use original URLs)
- [ ] Set up any Ghost-specific features (newsletters, memberships, etc.)
- [ ] Configure your theme and design
- [ ] Set up redirects from old URLs to new ones (if needed)

## 🆘 Troubleshooting

**Import fails:**
- Make sure you're using Ghost 5.x or newer
- Check that the JSON file uploaded completely
- If you have multiple parts, import them in order

**Images not showing:**
- Images use original URLs from chrishannah.me
- As long as your current site is online, images will work
- To migrate images, download and re-upload them manually to Ghost

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

# Ghost Migration Export

This directory contains a complete export of your 11ty blog ready for import into Ghost.

## 📊 Migration Summary

**Content Migrated:**
- **1,182 posts** (blog posts, micro posts, link posts, photo posts, quotes, etc.)
- **501 unique tags** (derived from post tags and categories)
- **1,550 images** (all locally stored images from your blog)
- **1 author** (Chris Hannah)
- **All metadata** including:
  - Publication dates
  - Featured images (where available)
  - Post excerpts/descriptions
  - Custom permalinks (converted to slugs)
  - Post types and layouts

## 📦 What's Included

### Files Generated

1. **`ghost-import.zip`** (1.8 GB)
   - This is the main file you'll import into Ghost
   - Contains the JSON export and all images
   - Ready for direct upload to Ghost

2. **`ghost-export/`** directory contains:
   - `ghost-import.json` - The Ghost-compatible JSON export
   - `images/` - All 1,550 images from your blog

## 🚀 How to Import into Ghost

### Step 1: Prepare Your Ghost Instance
Make sure you have a Ghost blog set up (either self-hosted or Ghost.com).

### Step 2: Import the Content

1. Log into your Ghost Admin panel
2. Navigate to **Settings → Labs**
3. Scroll down to **Import content**
4. Click **Import content**
5. Upload the `ghost-import.zip` file
6. Wait for the import to complete (this may take a few minutes due to the size)

### Step 3: Verify the Import

After import, Ghost will show you a summary. Verify:
- All 1,182 posts were imported
- Images are displaying correctly
- Tags are properly assigned
- Dates are correct

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

**Local Images:**
- 1,550 images were copied from your blog
- Images are referenced using Ghost's `__GHOST_URL__` placeholder
- Ghost will automatically update these to the correct URLs on import

**External Images:**
- Images hosted externally (including some from chrishannah.me CDN) remain as external URLs
- You can manually download and re-upload these later if desired

**Featured Images:**
- 135 posts have featured images
- These were extracted from the `image:` frontmatter field
- They'll appear as the hero image in Ghost

## 🏷️ Tags

**Total Tags: 501**

Tags were created from:
- Post `tags` arrays from frontmatter
- Post `categories` from frontmatter
- System tags like 'post', 'micro', 'link' were filtered out

All tags are set to **public** visibility.

## ✅ What Works Automatically

After import, the following will work automatically:
- ✅ All post content (HTML preserved)
- ✅ Post dates and times
- ✅ Featured images
- ✅ Tags and tag relationships
- ✅ Post slugs (URLs)
- ✅ Published status (all posts imported as published)
- ✅ Author attribution
- ✅ Images embedded in content

## ⚠️ Manual Adjustments Needed

You may want to manually adjust:

1. **Post Types**: Some content might be better as Ghost "pages" rather than posts
2. **Membership Settings**: All posts are imported as "public" - adjust if you want member-only content
3. **External Images**: Some older posts reference external images that you may want to re-upload
4. **Custom Excerpts**: Only posts with explicit `description` fields have excerpts
5. **Code Blocks**: Check that code formatting looks correct in Ghost's editor

## 🔧 Technical Details

**Ghost Version:** 5.0.0 (compatible with Ghost 5.x and newer)

**Data Structure:**
- Export follows Ghost's official import/export format
- Uses HTML content (not Mobiledoc or Lexical)
- All dates in ISO 8601 format
- Image paths use Ghost's content API structure

## 📌 Post-Import Checklist

- [ ] Verify post count (should be 1,182)
- [ ] Check a few sample posts to ensure formatting is correct
- [ ] Verify images are displaying
- [ ] Review and clean up tags if needed
- [ ] Set up any Ghost-specific features (newsletters, memberships, etc.)
- [ ] Configure your theme and design
- [ ] Set up redirects from old URLs to new ones (if needed)
- [ ] Update any broken external image links

## 🆘 Troubleshooting

**Import fails:**
- Make sure you're using Ghost 5.x or newer
- Check that the ZIP file uploaded completely
- Try uploading just the JSON file without images if the ZIP is too large

**Images not showing:**
- Ghost's importer should handle the `__GHOST_URL__` placeholder automatically
- If images don't appear, check the Ghost content/images directory
- External images (those not in the ZIP) will maintain their original URLs

**Duplicate content:**
- If you need to re-import, delete all content first in Ghost Admin
- Ghost doesn't automatically deduplicate on import

## 📚 Additional Resources

- [Ghost Import Documentation](https://ghost.org/docs/migration/)
- [Ghost Content API](https://ghost.org/docs/content-api/)
- [Ghost Admin Guide](https://ghost.org/help/)

## 🎉 Success!

Your blog is now ready to import into Ghost! This migration includes:
- **12+ years** of content (2013-2025)
- All content types from your 11ty blog
- Complete metadata and relationships
- All locally-stored images

Good luck with your Ghost blog!

---

*Generated by ghost-migration.mjs on ${new Date().toISOString()}*

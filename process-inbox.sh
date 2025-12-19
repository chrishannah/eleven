#!/bin/bash

# Process inbox files locally (mimics the GitHub workflow)

shopt -s nullglob

# Get current date info
year=$(date +%Y)
month=$(date +%m)
date_full=$(date +%Y-%m-%d)
target_dir="posts/$year/$month"

# Process markdown files
for draft in inbox/*.md; do
  [ -f "$draft" ] || continue

  filename=$(basename "$draft")
  echo "Processing: $filename"

  # Extract title from first H1 (# Title)
  title=$(grep -m 1 '^# ' "$draft" | sed 's/^# //')

  if [ -z "$title" ]; then
    echo "No H1 header found in $filename, skipping"
    continue
  fi

  echo "Title: $title"

  # Generate slug from title (lowercase, replace non-alphanumeric with hyphens)
  slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-|-$//g')
  echo "Slug: $slug"

  # Create target directory
  mkdir -p "$target_dir"

  # Generate filename with underscores (matching your convention)
  slug_snake=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/_/g; s/^_|_$//g')
  target_file="$target_dir/${slug_snake}.md"

  # Build the post with frontmatter
  printf '%s\n' "---" "title: $title" "date: $date_full" "tags:" "  - post" "layout: layouts/post" "permalink: $slug/" "---" > "$target_file"
  # Append content after the first line (the H1)
  tail -n +2 "$draft" >> "$target_file"

  echo "Created: $target_file"

  # Remove the draft
  rm "$draft"
  echo "Removed draft: $draft"
done

# Move any remaining files (images) to the target directory
for file in inbox/*; do
  [ -f "$file" ] || continue

  filename=$(basename "$file")
  echo "Moving image: $filename to $target_dir/"

  mkdir -p "$target_dir"
  mv "$file" "$target_dir/"
  echo "Moved: $filename"
done

echo "Done! Run 'npm run dev' to preview."

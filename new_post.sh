#!/usr/bin/env bash

# Exit if no title is provided
if [ -z "$1" ]; then
  echo "Usage: $0 \"Post Title\""
  exit 1
fi

# Get current date parts
YEAR=$(date +%Y)
MONTH=$(date +%m)
DATE=$(date +%Y-%m-%d)

# Input title
TITLE="$1"

# Create slug (snake_case for filename, kebab-case for permalink)
SLUG_SNAKE=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/_/g; s/^_|_$//g')
SLUG_KEBAB=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-|-$//g')

# Directory structure
DIR="posts/$YEAR/$MONTH"
mkdir -p "$DIR"

# Filename
FILE="$DIR/$SLUG_SNAKE.md"

# If file already exists, don’t overwrite
if [ -f "$FILE" ]; then
  echo "File already exists: $FILE"
  nvim "$FILE"
  exit 0
fi

# Write frontmatter to file
cat >"$FILE" <<EOF
---
title: $TITLE
date: $DATE
tags:
  - post
layout: layouts/post
permalink: $SLUG_KEBAB/
---
EOF

# Open in Neovim
nvim +"normal Go" "$FILE"

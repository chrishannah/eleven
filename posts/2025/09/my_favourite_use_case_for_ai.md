---
title: My Favourite Use Case for AI
date: 2025-09-21
tags:
  - post
layout: layouts/post
permalink: my-favourite-use-case-for-ai/
---

AI seems to have weaved its way into most software developers daily life, whether it's conversational advice, better autocomplete, or even just plain code generation. However, the use-case that I really enjoy is when it can speed-run boring tasks for me.

I don't use AI *that much* when programming. For me, I prefer it to complete little side quests for me than to get involved in my main work.

My recent use case was for this blog. I change up how I write and publish posts quite regularly, depending on the computer, and tools I want to use. So while I'm using Omarchy on my new Framework laptop, I'm more terminal-heavy than before. So ideally, I'd be able to run a quick shell script on my laptop, and then jump into writing a blog post.

So I gave Perplexity my idea, and then let it come up with a simple bash script to do that very job for me.

```bash
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
```

[GitHub Gist](https://gist.github.com/chrishannah/32aa01dd6ce4f9432d0a0388c728d418)

It does the following:

1. Takes in a single parameter, which is the blog post title.
2. Creates any required directories.
3. It uses that title in snake case for the filename, and creates a file.
4. It uses the title again, but in kebab case for the permalink.
5. Generates the rest of the frontmatter required for a standard post.
6. Opens the new file in Neovim.

[Watch it in action](https://www.youtube.com/watch?v=PLqmF2vesbQ):
<iframe width="560" height="315" src="https://www.youtube.com/embed/PLqmF2vesbQ?si=0ozMxIrIILA1DGOg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

I'm sure I could have written this script myself, but I didn't want to. This is the sort of task that I put off for weeks, and maybe never get around to doing it. So being able to get AI to do this for me, makes my life much easier.

***

I only just thought about this, but I should probably make use of my own Text Case CLI tool, and also format the title properly. That can be in the next version.

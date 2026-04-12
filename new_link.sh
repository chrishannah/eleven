#!/usr/bin/env bash

# Create inbox-links directory if needed
mkdir -p inbox-links

# Datetime-based filename
FILENAME="inbox-links/$(date +%Y-%m-%d-%H-%M-%S).md"

# Create the file with placeholder structure
cat >"$FILENAME" <<EOF
URL_HERE
# Title Here
tags:

EOF

# Open in Neovim, cursor on first line
nvim "$FILENAME"

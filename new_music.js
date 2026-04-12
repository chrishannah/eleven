#!/usr/bin/env node

import fetch from "node-fetch";
import fs from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline";
import { spawn } from "node:child_process";

const input = process.argv[2];

if (!input) {
    console.log('Usage:');
    console.log('  node new_music.js "Artist - Album"');
    console.log('  node new_music.js "https://music.apple.com/..."');
    process.exit(1);
}

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function snakeCase(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

async function prompt(question) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function searchItunes(query) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=album&limit=8`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
}

async function lookupItunesById(id) {
    const url = `https://itunes.apple.com/lookup?id=${id}&entity=album`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results?.[0] || null;
}

async function getSongLink(musicUrl) {
    try {
        const url = `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(musicUrl)}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        return data.pageUrl || null;
    } catch {
        return null;
    }
}

async function downloadArtwork(artworkUrl, destPath) {
    try {
        const res = await fetch(artworkUrl);
        if (!res.ok) return false;
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(destPath, buffer);
        return true;
    } catch {
        return false;
    }
}

function extractAppleMusicId(url) {
    // Match patterns like /album/something/123456 or ?i=123456
    const albumMatch = url.match(/\/album\/[^/]+\/(\d+)/);
    if (albumMatch) return albumMatch[1];
    const paramMatch = url.match(/[?&]i=(\d+)/);
    if (paramMatch) return paramMatch[1];
    return null;
}

async function main() {
    let artist, album, artworkUrl, itunesUrl;

    const isUrl = input.startsWith("http://") || input.startsWith("https://");

    if (isUrl) {
        // Direct Apple Music / iTunes URL
        console.log("Looking up URL...");
        const id = extractAppleMusicId(input);
        if (id) {
            const result = await lookupItunesById(id);
            if (result) {
                artist = result.artistName;
                album = result.collectionName;
                artworkUrl = result.artworkUrl100?.replace("100x100", "600x600");
                itunesUrl = result.collectionViewUrl;
            }
        }
        if (!artist) {
            // Fall back to using the URL directly for song.link
            artist = await prompt("Artist: ");
            album = await prompt("Album/Song: ");
            itunesUrl = input;
        }
    } else {
        // Search by "Artist - Album" or free text
        console.log(`Searching iTunes for "${input}"...`);
        const results = await searchItunes(input);

        if (results.length === 0) {
            console.log("No results found.");
            process.exit(1);
        }

        console.log("\nResults:");
        results.forEach((r, i) => {
            console.log(`  ${i + 1}. ${r.artistName} — ${r.collectionName} (${r.releaseDate?.slice(0, 4) || "?"})`);
        });

        const choice = await prompt("\nPick a number (or 0 to cancel): ");
        const idx = parseInt(choice, 10) - 1;

        if (idx < 0 || idx >= results.length) {
            console.log("Cancelled.");
            process.exit(0);
        }

        const picked = results[idx];
        artist = picked.artistName;
        album = picked.collectionName;
        artworkUrl = picked.artworkUrl100?.replace("100x100", "600x600");
        itunesUrl = picked.collectionViewUrl;
    }

    console.log(`\n  Artist:  ${artist}`);
    console.log(`  Album:   ${album}`);

    // Get song.link universal URL
    console.log("\nGetting universal link...");
    const songLinkUrl = await getSongLink(itunesUrl || input);
    if (songLinkUrl) {
        console.log(`  Link:    ${songLinkUrl}`);
    } else {
        console.log("  Could not generate universal link (will leave empty).");
    }

    // Set up file paths
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const date = `${year}-${month}-${now.getDate().toString().padStart(2, "0")}`;
    const slug = slugify(`${artist} ${album}`);
    const fileSlug = snakeCase(`${artist} ${album}`);

    const dir = `posts/${year}/${month}`;
    fs.mkdirSync(dir, { recursive: true });

    // Download artwork
    let artworkPath = "";
    if (artworkUrl) {
        const artworkFile = `${slug}.jpg`;
        const artworkDest = path.join(dir, artworkFile);
        console.log("\nDownloading artwork...");
        const ok = await downloadArtwork(artworkUrl, artworkDest);
        if (ok) {
            artworkPath = `/${dir}/${artworkFile}`;
            console.log(`  Saved to ${artworkDest}`);
        } else {
            console.log("  Failed to download artwork.");
        }
    }

    // Generate markdown
    const filePath = path.join(dir, `${fileSlug}.md`);

    if (fs.existsSync(filePath)) {
        console.log(`\nFile already exists: ${filePath}`);
        spawn("nvim", [filePath], { stdio: "inherit" });
        return;
    }

    // Quote title for YAML safety
    const yamlTitle = `"${album.replace(/"/g, '\\"')}"`;
    const yamlArtist = `"${artist.replace(/"/g, '\\"')}"`;

    let frontmatter = `---
title: ${yamlTitle}
date: ${date}
tags:
  - music
layout: layouts/music
permalink: music/${slug}/
artist: ${yamlArtist}`;

    if (artworkPath) {
        frontmatter += `\nartwork: "${artworkPath}"`;
    }
    if (songLinkUrl) {
        frontmatter += `\nmusicUrl: "${songLinkUrl}"`;
    }

    frontmatter += `\n---\n`;

    fs.writeFileSync(filePath, frontmatter);
    console.log(`\nCreated: ${filePath}`);

    // Open in Neovim
    spawn("nvim", ["+normal Go", filePath], { stdio: "inherit" });
}

main().catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
});

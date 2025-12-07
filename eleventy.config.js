import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import EleventyPluginOgImage from "eleventy-plugin-og-image";
import dateFilters from "./config/date.js";
import numberFilters from "./config/number.js";
import postFilters from "./config/post.js";
import blogTools from "eleventy-plugin-blog-tools";
import { inspect } from "node:util";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginIcons from "eleventy-plugin-icons";
import fs from "node:fs";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";

export default function (eleventyConfig) {
    const options = {
        html: true,
        breaks: false,
        linkify: false,
    };

    const md = markdownIt(options).use(markdownItFootnote);
    eleventyConfig.setLibrary("md", md);

    // Disable this error for the project.
    eleventyConfig.configureErrorReporting({ allowMissingExtensions: true });

    /* Development mode check */
    const isDevelopment = process.env.ELEVENTY_ENV === 'development';

    /* passthrough copy static folders */
    eleventyConfig.addPassthroughCopy({ "static/text-shot": "text-shot" });
    eleventyConfig.addPassthroughCopy({ "static/2020": "2020" });
    eleventyConfig.addPassthroughCopy({ "static/cv": "cv" });
    eleventyConfig.addPassthroughCopy({ "static/prntsc": "prntsc" });
    eleventyConfig.addPassthroughCopy({ "static/fonts": "fonts" });
    eleventyConfig.addPassthroughCopy({ "static/images": "images" });
    eleventyConfig.addPassthroughCopy({ "static/videos": "videos" });
    eleventyConfig.addPassthroughCopy({ "assets/js": "js" });

    eleventyConfig.addPassthroughCopy("posts/**/*.{jpg,jpeg,png,gif}");

    /* OG Image */
    eleventyConfig.addPlugin(EleventyPluginOgImage, {
        satoriOptions: {
            fonts: [
                {
                    name: "Helvetica",
                    data: fs.readFileSync("./static/fonts/Helvetica.ttf"),
                    style: "normal",
                },
            ],
        },
        generateOnBuild: !isDevelopment, // Skip generation in development mode
    });

    /* Collections */
    eleventyConfig.addCollection("all", function (collectionApi) {
        return collectionApi.getAllSorted().filter(function (item) {
            const isPage = item.data.layout?.includes("page") ?? false;
            const extension = item.inputPath.split(".").pop();
            return extension === "md" && !isPage;
        });
    });

    // Add this filter to exclude draft posts
    eleventyConfig.addFilter("excludeDrafts", function (posts) {
        return posts.filter(post => !post.data.draft);
    });

    /* Table of Contents Filter */
    eleventyConfig.addFilter("toc", function (content) {
        if (!content) return '';

        // Extract headers from HTML content
        const headerRegex = /<h([1-4])[^>]*>(.*?)<\/h\1>/g;
        const headers = [];
        let match;

        while ((match = headerRegex.exec(content)) !== null) {
            const level = parseInt(match[1]);
            const text = match[2].replace(/<[^>]+>/g, ''); // Remove any HTML inside the header
            // Create a URL-friendly ID from the header text
            const id = text.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
                .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

            headers.push({
                level,
                text,
                id
            });
        }

        if (headers.length === 0) return '';

        // Generate TOC HTML
        let tocHtml = '';
        headers.forEach((header) => {
            tocHtml += `<div class="toc-item level-${header.level}">
                <a href="#${header.id}">${header.text}</a>
            </div>`;
        });

        return tocHtml;
    });

    /* HTML Stuff */
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {});

    /* RSS */
    eleventyConfig.addPlugin(pluginRss);

    /* Blog Tools */
    eleventyConfig.addPlugin(blogTools);

    /* Icons */
    eleventyConfig.addPlugin(pluginIcons, {
        sources: [
            {
                name: "simple",
                path: "node_modules/simple-icons/icons",
            },
            {
                name: "lucide",
                path: "node_modules/lucide-static/icons",
            },
        ],
    });

    /* Filters */
    eleventyConfig.addFilter("debug", (content) => `${inspect(content)}`);

    Object.keys(dateFilters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, dateFilters[filterName]);
    });

    Object.keys(numberFilters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, numberFilters[filterName]);
    });

    Object.keys(postFilters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, postFilters[filterName]);
    });

    function filterTagList(tags) {
        return (tags || []).filter(
            (tag) => ["post", "micro", "link", "essay"].indexOf(tag) === -1
        );
    }

    eleventyConfig.addFilter("filterTagList", filterTagList);

    /* Watch for changes */
    eleventyConfig.addWatchTarget("./assets/css/");

    /* Ignore files in base folder */
    eleventyConfig.ignores.add("/*.MD");

    /* Development mode optimizations */
    if (isDevelopment) {
        // Ignore OG image templates
        eleventyConfig.ignores.add("**/*.og.njk");

        // Ignore old posts to speed up initial dev build
        // Comment out the lines below if you need to work on old posts
        eleventyConfig.ignores.add("posts/2013/**");
        eleventyConfig.ignores.add("posts/2015/**");
        eleventyConfig.ignores.add("posts/2016/**");
        eleventyConfig.ignores.add("posts/2017/**");
        eleventyConfig.ignores.add("posts/2018/**");
        eleventyConfig.ignores.add("posts/2019/**");
        eleventyConfig.ignores.add("posts/2020/**");
        eleventyConfig.ignores.add("posts/2021/**");
        eleventyConfig.ignores.add("posts/2022/**");
        eleventyConfig.ignores.add("posts/2023/**");
        // Keep 2024 and 2025 for recent posts
    }

    return {
        passthroughFileCopy: true,
        dir: {
            output: "public",
        },
    };
}

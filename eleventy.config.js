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
    const isDevelopment = process.env.ELEVENTY_ENV === 'development';
    eleventyConfig.addPlugin(EleventyPluginOgImage, {
        satoriOptions: {
            fonts: [
                {
                    name: "Inter",
                    data: fs.readFileSync("./static/fonts/iowan.ttf"),
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

    /* Watch for changes */
    eleventyConfig.addWatchTarget("./assets/css/");

    return {
        passthroughFileCopy: true,
        dir: {
            output: "public",
        },
    };
}

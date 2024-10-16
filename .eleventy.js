const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const EleventyPluginOgImage = require('eleventy-plugin-og-image');

const dateFilters = require('./config/date.js')
const numberFilters = require('./config/number.js')
const postFilters = require('./config/post.js')
const blogTools = require("eleventy-plugin-blog-tools");
const inspect = require("util").inspect;
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginIcons = require('eleventy-plugin-icons');
const fs = require('fs')

module.exports = function (eleventyConfig) {

    const markdownIt = require("markdown-it")
    const markdownItFootnote = require("markdown-it-footnote")

    const options = {
        html: true,
        breaks: false,
        linkify: false
    };

    let md = markdownIt(options).use(markdownItFootnote)
    eleventyConfig.setLibrary('md', md);

    /* passthrough copy static folders */
    eleventyConfig.addPassthroughCopy({ "static/text-shot": "text-shot" });
    eleventyConfig.addPassthroughCopy({ "static/2020": "2020" });
    eleventyConfig.addPassthroughCopy({ "static/cv": "cv" });
    eleventyConfig.addPassthroughCopy({ "static/prntsc": "prntsc" });
    eleventyConfig.addPassthroughCopy({ "static/fonts": "fonts" });
    eleventyConfig.addPassthroughCopy({ "static/images": "images" });
    eleventyConfig.addPassthroughCopy({ "static/videos": "videos" });
    eleventyConfig.addPassthroughCopy({ "assets/js": "js" });

    /* OG Image */
    eleventyConfig.addPlugin(EleventyPluginOgImage, {
        satoriOptions: {
            fonts: [
                {
                    name: 'Inter',
                    data: fs.readFileSync('./static/fonts/iowan.ttf'),
                    style: 'normal',
                },
            ],
        },
    });

    /* Collections */
    eleventyConfig.addCollection("all", function (collectionApi) {
        return collectionApi.getAllSorted().filter(function (item) {
            // Only return content that was originally a markdown file
            let isPage = false
            if (item.data.layout != null) {
                isPage = item.data.layout.includes('page');
            }
            let extension = item.inputPath.split('.').pop();
            return extension === "md" && !isPage;
        });
    });

    /* HTML Stuff */
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
        filters: {
            base: "htmlBaseUrl",
            html: "transformWithHtmlBase",
            pathPrefix: "addPathPrefixToUrl",
        },
    });

    /* RSS */
    eleventyConfig.addPlugin(pluginRss);

    /* Blog Tools */
    eleventyConfig.addPlugin(blogTools);

    /* Icons */
    eleventyConfig.addPlugin(pluginIcons, {
        sources: [
            {
                name: 'simple',
                path: 'node_modules/simple-icons/icons',
            }, {
                name: 'lucide',
                path: 'node_modules/lucide-static/icons',
            },
        ]
    });

    /* Filters */
    eleventyConfig.addFilter("debug", (content) => `${inspect(content)}`);

    Object.keys(dateFilters).forEach(filterName => {
        eleventyConfig.addFilter(filterName, dateFilters[filterName])
    })

    Object.keys(numberFilters).forEach(filterName => {
        eleventyConfig.addFilter(filterName, numberFilters[filterName])
    })

    Object.keys(postFilters).forEach(filterName => {
        eleventyConfig.addFilter(filterName, postFilters[filterName])
    })

    /* Watch for changes */
    eleventyConfig.addWatchTarget("./assets/css/");

    return {
        passthroughFileCopy: true,
        dir: {
            output: 'public'
        }
    }
}

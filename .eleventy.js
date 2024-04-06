const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const dateFilters = require('./config/date.js')
const numberFilters = require('./config/number.js')
const postFilters = require('./config/post.js')
const blogTools = require("eleventy-plugin-blog-tools");
const inspect = require("util").inspect;

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
    eleventyConfig.addPassthroughCopy({ "static/cv": "2020" });
    eleventyConfig.addPassthroughCopy({ "static/prntsc": "prntsc" });
    eleventyConfig.addPassthroughCopy({ "static/fonts": "fonts" });

    /* Collections */
    eleventyConfig.addCollection("all", function (collectionApi) {
        return collectionApi.getAllSorted().filter(function (item) {
            // Only return content that was originally a markdown file
            let extension = item.inputPath.split('.').pop();
            return extension === "md";
        });
    });

    /* Blog Tools */
    module.exports = function (eleventyConfig) {
        eleventyConfig.addPlugin(blogTools);
    };

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

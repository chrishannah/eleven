const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const dateFilters = require('./config/date.js')
const numberFilters = require('./config/number.js')
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

  ['src/assets', 'src/files'].forEach(path => {
    eleventyConfig.addPassthroughCopy(path, {
      filter: path => !path.endsWith('.css') && !path.startsWith('_')
    })
  })

  /* Collections */
  eleventyConfig.addCollection("all", function (collectionApi) {
    return collectionApi.getAllSorted().filter(function (item) {
      // Only return content that was originally a markdown file
      let extension = item.inputPath.split('.').pop();
      return extension === "md";
    });
  });

  /* Filters */
  eleventyConfig.addFilter("debug", (content) => `<pre><code>${inspect(content)}</code></pre>`);

  Object.keys(dateFilters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, dateFilters[filterName])
  })

  Object.keys(numberFilters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, numberFilters[filterName])
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

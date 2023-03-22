const pluginWebc = require("@11ty/eleventy-plugin-webc");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");

const imageShortcode = async (
  src,
  alt,
  className = undefined,
  widths = [600, 800],
  formats = ["webp", "jpeg"],
  sizes = "100vw"
) => {
  const imageMetadata = await Image(src, {
    widths: [...widths, null],
    formats: [...formats, null],
    outputDir: "dist/assets/images",
    urlPath: "/assets/images",
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(imageMetadata, imageAttributes);
};

module.exports = (config) => {
  config.addPlugin(pluginWebc, {
    components: "src/_includes/components/**/*.webc",
    transformData: {},
  });
  config.addPlugin(EleventyRenderPlugin);

  // Shortcodes
  config.addNunjucksAsyncShortcode("image", imageShortcode);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  config.addPassthroughCopy("./src/fonts");
  config.addPassthroughCopy("./src/favicons");
  config.addPassthroughCopy("./src/robots.txt");
  //don't need this since we're running these through 11ty-image plugin
  // config.addPassthroughCopy("./src/images");
  // don't need since I removed javascript for the form submit
  // config.addPassthroughCopy("./src/js");

  config.addFilter("md", require("./src/filters/md.js"));

  // watch css
  config.addWatchTarget("./src/css/");
  config.setWatchThrottleWaitTime(150);

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};

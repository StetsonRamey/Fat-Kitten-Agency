const pluginWebc = require("@11ty/eleventy-plugin-webc");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = (config) => {
  config.addPlugin(pluginWebc, {
    components: "src/_includes/components/**/*.webc",
    transformData: {}
  });
  config.addPlugin(EleventyRenderPlugin);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  config.addPassthroughCopy("./src/fonts");
  config.addPassthroughCopy("./src/images");

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

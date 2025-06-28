import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget("css/**/*.css");
  eleventyConfig.addPassthroughCopy("css/**/*.css");

  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
}

export const config = {
  dir: {
    input: "content",
    includes: "../_includes", // default: "_includes" (`input` relative)
    data: "../_data", // default: "_data" (`input` relative)
    output: "_site",
  },
};

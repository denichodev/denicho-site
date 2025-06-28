import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget("css/**/*.css");
  eleventyConfig.addPassthroughCopy("css/**/*.css");

  eleventyConfig.addPassthroughCopy("fonts/**/*.{woff,woff2,ttf,otf,eot,svg}");

  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
}

export const config = {
  dir: {
    input: "content",
    includes: "../_includes", // default: "_includes" (`input` relative)
    data: "../_data", // default: "_data" (`input` relative)
    output: "_site",
  },
};

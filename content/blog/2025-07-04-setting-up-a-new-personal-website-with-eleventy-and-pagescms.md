---
title: Setting up a new personal website with Eleventy and PagesCMS
date: 2025-07-04
tags:
  - blog
  - learning_notes
---
# Setting up a new personal website with Eleventy and PagesCMS

It's been a while since I actively maintained my [old website](https://denicho-dev-deni-chos-projects.vercel.app/). Back then, it was supposed to act like a business card, an easy link where people can get to know the most basic information about me and of course, for recruiter to know what they need to know about me. But that's not the end of it. It was also supposed to be where I put my writings. I made it with Svelte in a private repository (hence I can't link it and I have no plans on making it public). After years of having it live, I didn't manage to realize the "blogging" part of the site. I guess it's just that I think with my lack of experience in Svelte, making it work for a blog is just a pain in the ass.

Years has passed and I've been seeing the trend where people's website is stupidly simple. No fancy stylings, no huge JavaScript bundles with massive dependencies, and basically, no nonsense & no _bullshittery_. Here's the thing, when I was younger I'm always amazed by fancy buttons and nav bars, but now, I don't really care about it that much anymore, I just want it to be functional, **I just want to make it work, and make it work fast**. That's basically where I stumbled upon [Eleventy](https://www.11ty.dev). Well, it does have a huge dependencies I guess, but in the end, what I needed is just a plain ol' HTML + CSS to get my points across.

## Starting up from scratch

Well I know nothing about Eleventy. Followed what is in the [Getting Started guide](https://www.11ty.dev/docs/) is easy though, so props to them for setting it up nicely. Right after I finished, there's basically nothing on the page except a README.md that gets transformed (compiled?) to an HTML page. I know I wanted something like this [base blog example](https://github.com/11ty/eleventy-base-blog) but I don't want to copy paste everything and not learning anything. So I begin in simple steps.

## Making it stylish

Apparently there are some ways you can add CSS to an Eleventy blog. The simplest would be creating a CSS file, copy it to the compile target directory (let's call it "build"), and obviously link it from the HTML document. Well, that's when I learn of `addPassthroughCopy`, which does basically that.

```js
  // eleventy.config.js

  // Recompile when anything in the CSS directory changes.
  eleventyConfig.addWatchTarget("css/**/*.css");
  // Copy the css files into the build directory.
  eleventyConfig.addPassthroughCopy("css/**/*.css");
```
Well now I just got to link it in my HTML file with a simple `<link>` tag and it works.

But sadly it looks ugly though. The CSS would load late and there will be some layout shift because the style would differ quite a lot. Well now I need to make my CSS files a "critical CSS" file. Basically inlining the content of `index.css`.

Well thankfully the documentation comes in handy and shows me exactly how to do just that.

```js
  // eleventy.config.js

  eleventyConfig.addBundle("css", {
    toFileDirectory: "dist",
    // Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
    // Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
    bundleHtmlContentFromSelector: "style",
  });
```

{% raw %}
```liquid
  // index.liquid

  <style>
    {% include "./css/index.css" %}
  </style>
  <style>
    {% getBundle "css" %}
  </style>
```
{% endraw %}

So basically `addBundle` will create a bundle (named "css" in the example) to the file directory. Well what would be the content of the bundle? That's exactly what `bundleHtmlContentFromSelector` is for, basically with the help of `posthtml-match-helper` it will select everything that's inside a `<style>`, in which I render with using liquid's `include`, and put it right inside another style tag.

My honest thought, this is a little bit confusing (even now), but it works though. And in the case where I want to bundle more css, I could just add more `<style>` tag.

For fonts, nothing special is really going on though. I set my `font-display` to be `fallback` so it has 100ms of invisibility while the font is getting downloaded. It will swap right after if it's done, or just render the fallback option. There's also a [tool](https://textlab.dev/tools/css-size-adjust-tester) from Mandy Michael that helps with layout shift by using `size-adjust` for fonts, but I didn't bother to do it in the end.

## PagesCMS for... content management

Well I was looking at my options for CMS. What I want is basically pretty darn simple CMS that lets me quickly adjust anything if I don't have my laptop with me (rarely happens though). Enter PagesCMS. Setting it up was pretty easy, nothing complicated is going on in their [documentation](https://pagescms.org/docs/), and it gets the job done. No deployment needed, no need to host anywhere, and the best part is that there is **no payment required** ;).

One thing to note is that I set the `body` of my posts to be `type: code` so that I can have full control on what I put inside, like an HTML element or a liquid code, pretty much anything (so far) that can be parsed by Eleventy.

## Putting pictures and stuff

First thought, this is a total overkill. As of now, you might notice that there are barely images on the website. Well that might change in the future, as I wanted to put some pictures that I took while I travel, or some collections of pixel art that I ended up not procrastinating of learning on how to do. So I need something scalable and for sure I'm not going to upload everything on my GitHub repo. Hence, I pretty much setup S3 and CloudFront to do the task.

<figure>
  <img
    width="320"
    src="{{ metadata.cloudfront }}/boba.jpg"
    alt="A gray cat with long fur."
  >
  <figcaption>Example image served by CloudFront.</figcaption>
</figure>

I optimised the image with [Magick](http://imagemagick.org), then upload it to S3 which then gets served by CloudFront. Then to put the image, I'll just use{% raw %} `src="{{ metadata.cloudfront }}/<filename.ext>"`{% endraw %}, using Eleventy's data handling to set the `metadata` globally. This is definitely not ideal but I'll deal with easier workflow in the future, once I need it ;).

## Getting it live

Ugh.. This is the part that I don't really enjoy. The only thing I know is that **I need it to be fast**. At first, I deployed the final result to [Cloudflare Pages](https://pages.cloudflare.com) but somehow, the TTFB (Time to First Byte) would reach 200-300ms from where I'm currently accessing it from, and this is definitely not ideal.

I tried to access some blog that's hosted on GitHub pages, and now the TTFB would be down to be 16ms. Well I'm not bothered that much to figure out exactly why, maybe CloudFlare Pages is just slower on where I'm accessing it from (Munich), so yeah, I went with GitHub pages. Anyway, please do let me know if this website is slow for you!

Other considerations would be [NearlyFreeSpeech](http://nearlyfreespeech.net) but I haven't tested anything yet. I like how it looks simple (to see, not to setup), but I don't need it yet so I'll just roll with the cheapest option.


## Final thoughts

Well that's basically it. I didn't go into detail for some of the points, as I'm just writing down my thoughts process on some of the decisions that I made when I created this very website that you're seeing.

Eleventy has been nice to me so far. They could've updated their [blog example repo](https://github.com/11ty/eleventy-base-blog) to be honest, because I find that the example of GitHub Pages deployment is a little outdated. I get confused a little as well with [Front Matter Data](https://www.11ty.dev/docs/data-frontmatter/) but maybe I'm just lacking experience. The rest of the stacks seems to be fine, and I will definitely write more once there's something interesting or anything in need of a change.

Also, it's been a while since I write anything techy, so might need to warm up more a little bit! <3

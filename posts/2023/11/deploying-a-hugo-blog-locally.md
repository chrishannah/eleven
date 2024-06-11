---
categories:
- blogging
date: 2023-11-12 16:00:38
layout: layouts/post
permalink: deploying-a-hugo-blog-locally/
tags:
- post
title: Deploying a Hugo Blog Locally
---

I switched this blog from [Ghost](https://ghost.org) to [Hugo](https://gohugo.io) a few months back, and I have to say, one my favourite parts about Hugo is that I can build my site literally anywhere. You just need three things, your blog files (config, posts, etc.), your blog theme, and also the [Hugo command line tool](https://gohugo.io/getting-started/usage/).

Then all you need to do in the command line is run `hugo server`.

![](https://chrishannah.me/images/2023/11/Screenshot%202023-11-12%20at%2015.51.43.png)

After that you haven't just built a bunch of static `.html` files. Instead, Hugo runs a local web server that live reloads on changes to your site config, blog posts, theme, etc. So it's not just a simple way of previewing your blog content, it's a literal copy of what your entire site is going to look like when it goes live.

I'm finding it to be super helpful in all sorts of situations. It's not only great to see how an individual post looks, but I can now see if it appears correctly in the archives, on the home page, how the RSS feed is generated, if the frontmatter is valid, and, of course, if the site compiles at all.

Since I write most of my blog posts on my Mac, I tend to run it at least once before I commit my changes (which, in turn deploys my blog). Just earlier today, I setup a separate CDN for all the images that are stored on this blog, and I used a local Hugo server to verify that everything had switched over correctly.

There's certainly a few downsides to using Hugo, which mostly come from it being a static site generator and not something with an API that a bunch of third-party apps can support. But things like this make me think that (at least for now) I've made the correct decision.

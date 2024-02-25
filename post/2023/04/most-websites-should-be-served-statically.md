---
categories:
- Web
- Website
- essay
date: 2023-04-18 19:06:27+00:00
description: ''
layout: layouts/post
permalink: most-websites-should-be-served-statically/
tags:
- Web
- Website
- post
title: Most websites should be served statically
---

I've had this thought for quite some time, and it's that most websites don't need to be served dynamically. For example, most blogs that are powered by WordPress or Ghost will dynamically fetch the relevant content and build the page every time a visitor visits a URL[^1].

There's nothing stopping sites from being built dynamically, using centrally stored content, and various templates that can be put together to build a complex website. It should just happen once, and then the generated static content can be efficiently served again and again, until the source content changes, and triggers it to be rebuilt.

This is much more relevant for blogs since the content on the page doesn't change, except for possibly a web font, or a JavaScript snippet for analytics or an advert. However, these are usually externally sourced, and won't affect the static HTML code that can be served to your users[^2].

This may sound a bit ironic, since my blog currently runs on Ghost, and serves content dynamically[^3]. Although, I am working towards a solution for that, by building my own static site generator, [Arbok](https://github.com/chrishannah/Arbok).

[^1]: Yes, I'm sure some people have a caching mechanism installed, but I wouldn't say it's everyone, and it really masks a problem rather than fixing one.

[^2]: Another benefit of this, is that you can bundle together resources into a final `.html` file, such as any CSS styles. Which reduces the number of requests the browser needs to make when visiting your page.

[^3]: Although if you have a look at your browsers web inspector, you'll find that I've already done some work to reduce the size of my website.
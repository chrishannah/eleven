---
categories:
- Development
- Slate
date: 2018-04-16 22:54:57+00:00
description: ''
layout: layouts/post
permalink: slate-development-log-6/
tags:
- Development
- Slate
- post
title: 'Slate Development Log #6'
---

<p>It’s time for <strong>v0.2</strong>!</p>
<p>The second public version of Slate is on it’s way to all current beta testers. And it’s so much better than v0.1.</p>
<p><img loading="lazy" width="3415" height="2436" class="alignnone size-full wp-image-1219" src="https://chrishannah.me/wp-content/uploads/2018/04/Image.png" srcset="https://cdn.chrishannah.me/images/2018/04/Image.png 3415w, https://cdn.chrishannah.me/images/2018/04/Image-300x214.png 300w, https://cdn.chrishannah.me/images/2018/04/Image-768x548.png 768w, https://cdn.chrishannah.me/images/2018/04/Image-1024x730.png 1024w" sizes="(max-width: 3415px) 100vw, 3415px" /></p>
<p>I’ve been doing a lot of refinement recently, to the way things are parsed, to even how images are cached, and how the views are dynamically built.</p>
<p>One major feature, that may not even seem impressive, is inline images. I removed this from the posts because they were causing the app to really slow down, due to the image downloading happening synchronously with the HTML parsing. However, I now extract these from the content, hide them from appearing in the main text, and then control them myself.</p>
<p>This allows me to set the layout depending on the number of images, and then load them asynchronously in the background.</p>
<p>They’re <em>slightly</em> styled at the moment, with rounded corners, and a background if they aren’t an exact square. But the next step is to maybe allow for a preference on preview sizes and also to be able to tap and view the image full screen.</p>
<p>Of course, this version also brings the new themes, which I wrote about in the last development log. And as I keep developing the app, I’m sure these will be fine-tuned.</p>
<p>If you want to be part of the beta, all I require is an email address to send the TestFlight invite to. Feel free to <a href="mailto:me@chrishannah.me">email me</a>, or find me on <a href="https://twitter.com/chrishannah">Twitter</a> or <a href="http://micro.blog/chrishannah">Micro.blog</a>.</p>
<p>You can keep up to date with the development of Slate, in <a href="https://chrishannah.me/category/slate-development-log/">it’s own category</a>.</p>
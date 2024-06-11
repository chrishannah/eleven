---
categories:
- App
- JSON
- macOS
- Quick Look
date: 2019-01-24 11:21:10+00:00
description: ''
image: https://chrishannah.me/images/2019/01/Screenshot-2019-01-24-at-11.04.03.png
layout: layouts/post
permalink: previewing-json-with-quick-look/
tags:
- App
- JSON
- macOS
- Quick Look
- post
title: Previewing JSON Files with Quick Look
---

<p>Quick Look, the infinitely valuable tool on the Mac that lets you near-enough instantly preview a file. It’s really impressive the number of file formats it supports, but there are always going to be a few things it doesn’t. And that’s where plugins come into it.</p>
<p>One great one that I discovered via twitter today is <a href="https://github.com/sindresorhus/quick-look-plugins#quicklookjson">QuickLookJSON</a>. I’m sure you’ve already guessed what it does. But anyway, I may as well show you as well.</p>
<p><img loading="lazy" class="alignnone size-full wp-image-6765" src="https://chrishannah.me/images/2019/01/Screenshot-2019-01-24-at-11.11.46.png" width="1228" height="664" srcset="https://chrishannah.me/images/2019/01/Screenshot-2019-01-24-at-11.11.46.png 1228w, https://chrishannah.me/images/2019/01/Screenshot-2019-01-24-at-11.11.46-300x162.png 300w, https://chrishannah.me/images/2019/01/Screenshot-2019-01-24-at-11.11.46-768x415.png 768w" sizes="(max-width: 1228px) 100vw, 1228px" /></p>
<p><img loading="lazy" class="alignnone size-full wp-image-6764" src="https://chrishannah.me/images/2019/01/Screenshot-2019-01-24-at-11.11.54.png" width="1228" height="906" srcset="https://chrishannah.me/images/2019/01/Screenshot-2019-01-24-at-11.11.54.png 1228w, https://chrishannah.me/images/2019/01/Screenshot-2019-01-24-at-11.11.54-300x221.png 300w, https://chrishannah.me/images/2019/01/Screenshot-2019-01-24-at-11.11.54-768x567.png 768w" sizes="(max-width: 1228px) 100vw, 1228px" /></p>
<p>It not only displays JSON files though, it indents them properly, applies a colour scheme, and also lets you  expand and collapse any of the data. That last one alone makes it super easy to navigate through a big JSON file.</p>
<p>To install QuickLookJSON, you can either <a href="http://www.sagtau.com/quicklookjson.html">install it manually</a> or do it via <a href="https://brew.sh">Homebrew</a>. The only command you’ll need to run is:</p>
<pre><code class="bash">brew cask install quicklook-json
</code></pre>
<p>There’s a bunch of other plugins that add further support to Quick Look, like adding syntax highlighting to code, rendering Markdown, and even allowing navigation through a .zip archive in the preview. <a href="https://github.com/sindresorhus/quick-look-plugins">You can find all of these on one page on GitHub</a>, thanks to <a href="https://sindresorhus.com">Sindre Sorhus</a>.</p>

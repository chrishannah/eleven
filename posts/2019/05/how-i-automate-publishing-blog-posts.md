---
categories:
- Automation
- Blogging
- iOS
date: 2019-05-30 18:57:22+00:00
description: ''
layout: layouts/post
permalink: how-i-automate-publishing-blog-posts/
tags:
- Automation
- Blogging
- iOS
- post
title: How I Automate Publishing Blog Posts
---

<p>I wrote recently about <a href="https://chrishannah.me/how-i-automate-my-daily-journal/">how I’m automating my daily journal</a>, and it mainly focussed around how I started the writing, as the publishing was quite a manual process.</p>
<p>However, I’ve now managed to automate the publishing part of my writing process. Which I’ve been using for every blog post since, not just my daily journal.</p>
<p>I started off with Federico Viticci’s <a href="https://www.icloud.com/shortcuts/2e934815b428461daa88a70b2a7dff95">Publish to WordPress</a> shortcut<sup id="fnref-1"><a href="1" rel="footnote">1</a></sup>, which he posted on his incredible <a href="https://www.macstories.net/stories/beyond-the-tablet/">Behind the Tablet</a> article. But I had to make a few changes to make it work with the way I’ve configured my blog.</p>
<p>Here’s Federico’s description of his shortcut:</p>
<blockquote><p>
  Publish a Markdown post to WordPress via the Shortcuts action extension. The shortcut can extract the h1 Markdown header from a post and use it as title. Optionally, you can publish both standard and &#8220;linked list&#8221; post types by adding a custom field supported by your WordPress installation.
</p></blockquote>
<p>The changes I made were:</p>
<ul>
<li>Changing the <code>Format</code> parameter of the ‘Post to WordPress’ action to <code>Ask When Run</code>. This way I can alter between standard and link type posts. The shortcut already handled linked posts so it could extract a URL and add that as a custom field on a post. But my theme styles linked posts slightly differently, and it depends on the post format to do that.</li>
<li>I also changed the <code>Publish Date</code> parameter to <code>Ask When Run</code> as sometimes I like to schedule posts. Or if I’m publishing my journal, and I’ve slightly run into the next day, I like to make sure it’s published on the correct date.</li>
<li>One section I removed was the file saving, as I don’t particularly need another copy of the final results. I like to think of my blog as the place for canonical copies.</li>
<li>The last action was to open MacStories in the browser, so of course, I changed that to the url of this blog. So I can quickly check out the live version.</li>
</ul>
<p>In essence, it’s a <em>relatively</em> simple shortcut, in that it takes text and publishes it here on my blog. However it takes care of so much of the annoying parts of the publishing process, such as setting the categories, tags, post types, extracting links for sources, and still more. I guess that’s the perfect case for automation.</p>
<p>One last thing I have to call out, is the natural language parsing when entering a publish date for a post. When using the web interface for WordPress, I found it really irritating to use the date/time picker. But now I can write something like “tomorrow at noon” or “yesterday at 23:00”, and it just understands it perfectly.</p>
<p>I’m not sure if this will directly benefit anyone, but I hope it at least shows some benefits of using automation when publishing to a blog. And also, that it’s very beneficial to keep checking out the many Shortcuts that people like Federico are sharing.</p>
<p><a href="https://www.icloud.com/shortcuts/2e934815b428461daa88a70b2a7dff95">Download Federico’s “Publish to WordPress” shortcut.</a></p>
<p><a href="https://www.icloud.com/shortcuts/ee4503b341ee4718bb93502ac77ffc94">Download my modified “Publish to WordPress” shortcut.</a></p>
<div class="footnotes">
<hr />
<ol>
<li id="fn-1">
The shortcut also includes the Title Case action from my app, <a href="https://textcase.app">Text Case</a>. Which I (with a massive bias) find very helpful.&#160;<a href="1" rev="footnote">&#8617;</a>
</li>
</ol>
</div>
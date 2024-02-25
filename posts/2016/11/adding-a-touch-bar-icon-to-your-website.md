---
categories:
- css
- Guide
- html
- TouchBar
date: 2016-11-28 10:49:37+00:00
description: ''
layout: layouts/post
permalink: adding-a-touch-bar-icon-to-your-website/
tags:
- css
- Guide
- html
- TouchBar
- post
title: Adding a Touch Bar Icon to Your Website
---

<div class="kg-card-markdown">
<p>With the MacBook Pro&#8217;s new Touch Bar, you can now <a href="https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/pinnedTabs/pinnedTabs.html">create your own favicon</a> that will appear there when a user sets it as a bookmark. The same file is also use to create an alpha mask when adding your website as a Pinned Tab.</p>
<p>It&#8217;s a small bit of code, that you add to your <code>&lt;HEAD&gt;</code> section, just by your other favicons.</p>
<p>Just specify that it is a &#8220;mask-icon&#8221;, add the location for the file (has to be SVG), and then specify a colour to be used. The colour is the background on the Touch Bar icon, and it&#8217;s also the colour used in the Pinned Tab mask.</p>
<p>Code:</p>
<pre><code class="language-language-markup">&lt;link
    rel="mask-icon"
    href="safari-pinned-tab.svg"
    color="#dc7604"
&gt;
</code></pre>
<p>As an example, you can see the <a href="https://chrishannah.me/wp-content/uploads/2016/11/CyOnndNXAAEZJcF-jpg-large.jpeg">new touch bar icon</a> I made for Radical Thinker.</p>
<p><img class="alignnone size-full wp-image-584" src="https://chrishannah.me/wp-content/uploads/2016/11/CyOnndNXAAEZJcF-jpg-large.jpeg" /></p>
<p>If you haven&#8217;t already, you can also set an icon for when a user adds your website to their home screen on iOS. This is done similarly, but doesn&#8217;t have to be an SVG.</p>
<p>Code:</p>
<pre><code class="language-language-markup">&lt;link
    rel="apple-touch-icon"
    sizes="180x180"
    href="apple-touch-icon.png"
&gt;
</code></pre>
</div>
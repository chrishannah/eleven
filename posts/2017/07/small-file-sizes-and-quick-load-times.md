---
categories:
- Meta
- Website
date: 2017-07-10 23:14:10+00:00
description: ''
layout: layouts/post
permalink: small-file-sizes-and-quick-load-times/
tags:
- Meta
- Website
- post
title: Small File Sizes and Quick Load Times
---

<div class="kg-card-markdown">
<p>I’ve been getting more obsessed with these two things recently, and you may have already noticed it with the recent “redesign”, if you can call it that. Basically, the design has been simplified even more, and a higher focus (like everyone always says) has been put on the content.</p>
<p>I’ve had this mindset towards website sizes, and how fast they should load for quite a while. But it’s only the past week or so that I’ve put effort into sorting out my website.</p>
<p>It started with optimising the images on the website, which consisted of resizing every image so that the width didn’t exceed 1400px and height didn’t exceed 1200px. They’re not exactly small sizes, but we live in a Retina world, and I have to put up with that. On top of that, all PNGs were put through the highest compression in <a href="https://chrishannah.me/squash-2/">Squash 2</a>, and any image that was currently on the front page (I really couldn’t be bothered to do this for every post), was converted to JPG.</p>
<p>It was a <em>decent</em> start, and it certainly made a noticeable change in the size, with it taking my home page <a href="https://twitter.com/chrishannah/status/882888620901793794">from 6MB to 1.2MB</a>. It’s a relatively big difference, but I still felt that it wasn’t near enough what I was aiming for.</p>
<p>My desire is to have my website show off the content really nicely, be measured in mere kilobytes, and load so fast it’s not even recognisable.</p>
<p>Fast forward to today, where both the size and load speed metrics have improved <strong>a lot</strong>. I’ve been playing around with a few static site generators, and thinking about doing a more custom approach to the website, but I realised that <a href="https://ghost.org">Ghost</a> (what this site runs on) can be manipulated itself. So for now, nothing major has changed with the underlying blog engine.</p>
<p>I have done a few things though:</p>
<ul>
<li>Removed Prism &#8211; this was the already small library that I used to style any embedded code, but it’s not really relevant.</li>
<li>Cleaned up and minified my CSS file (yes, I write basic css).</li>
<li>Removed all javascript, including Google Analytics!</li>
</ul>
<p>Google Analytics was the hardest to remove, but I got down to a point a page showing a single text-only post, would be roughly 50KB. 29KB of that was Google Analytics. This was didn’t seem like nice ratio to me, so for now it is gone. Hopefully in the future, I can write something minimal myself to track basic page views, but I’m not worried about that just yet.</p>
<p>Here are a few examples of the website size and load speeds:</p>
<ul>
<li>“<a href="https://chrishannah.me/5k-versions-of-every-default-macos-wallpaper/">5K Versions of Every Default macOS Wallpaper →</a>” (&lt;30 words, 0 images) &#8211; <strong>7.36KB</strong> (70-130ms)</li>
<li>“<a href="https://chrishannah.me/emergency-sos-on-apple-watch/">Emergency SOS on Apple Watch</a>” (&lt;250 words, 0 images) &#8211; <strong>8.39KB</strong> (85-105ms)</li>
<li>“<a href="https://chrishannah.me/snapchat-can-now-share-your-location/">Snapchat Can Now Share Your Location</a>” (&lt;500 words, 3 images) &#8211; <strong>427KB</strong> (200-300ms)</li>
</ul>
<p>I’m really happy with the low page sizes, and it appears the only thing truly adding to the size now is the images, which I can deal with. I’ll just start to use them where the need to be used, and nowhere else. The load speeds varied across multiple attempts, so that’s why a range was given (caches were disabled).</p>
<p>My next step will be to try and further optimised the actual Ghost engine itself, to see if any speed improvements can be made there. And I guess maybe an improved cloud server would help also? Then there is the dream goal of custom web analytics.</p>
<p>So rest assured, for now, nothing is being tracked on this website.</p>
<p>I’d be very interested in hearing everyone else opinions on website sizes, and all the rubbish I’ve wrote here in this post. Because while I really want my blog to be under 10Kb in most scenarios, it probably doesn’t make a huge difference to the reader.</p>
</div>
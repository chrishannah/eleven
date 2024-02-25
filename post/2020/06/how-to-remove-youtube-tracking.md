---
categories:
- Technology
- Guide
- YouTube
date: 2020-06-30 00:11:26+00:00
description: ''
layout: layouts/post
permalink: how-to-remove-youtube-tracking/
tags:
- Technology
- Guide
- YouTube
- post
title: How To Remove YouTube Tracking
---

<p><a href="https://dri.es/how-to-remove-youtube-tracking">Dries Buytaert</a>:</p>
<blockquote>
<p>After some research, I discovered that YouTube offers a privacy-enhanced way of embedding videos. Instead of linking to youtube.com, link to youtube-nocookie.com, and no data-collecting HTTP cookie will be sent. This is Google&#8217;s way of providing GDPR-compliant YouTube videos.</p>
</blockquote>
<p>(<a href="https://daringfireball.net/linked/2020/06/27/how-to-remove-youtube-tracking">via Daring Fireball</a>)</p>
<p>I was completely unaware that this GDPR-compliant version of YouTube embeds were available. But, seeing as it makes no sense to use the standard embed when this one exists, I&#8217;ve made changes to my site so all YouTube embeds will automatically use the <code>-nocookie</code> version.</p>
<hr />
<p>Just in case this helps anyone else add this to their blog, <a href="https://wordpress.org/support/topic/video-shortcode-youtube-nocookie-not-working/#post-10409118">RavanH posted a code snippet on the WordPress.org forums</a> to make WordPress shortcodes automatically convert YouTube embeds.</p>
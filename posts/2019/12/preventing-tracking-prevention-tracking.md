---
categories:
- Safari
- WebKit
date: 2019-12-11 22:53:05+00:00
description: ''
layout: layouts/post
permalink: preventing-tracking-prevention-tracking/
tags:
- Safari
- WebKit
- post
title: Preventing Tracking Prevention Tracking
---

<p><a href="https://webkit.org/blog/9661/preventing-tracking-prevention-tracking/">John Wilander, writing at the WebKit blog</a>:</p>
<blockquote><p>Any kind of tracking prevention or content blocking that treats web content differently based on its origin or URL risks being abused itself for tracking purposes if the set of origins or URLs provide some uniqueness to the browser and webpages can detect the differing treatment.</p>
<p>To combat this, tracking prevention features must make it hard or impossible to detect which web content and website data is treated as capable of tracking. We have devised three ITP enhancements that not only fight detection of differing treatment but also improve tracking prevention in general.</p></blockquote>
<p>You would have thought that simply preventing tracking would stop trackers. Well it turns out that if websites can see if you are using prevention tools, then you can still be singled out. John lists a few ways in which enhancements are being made to Intelligent Tracking Prevention in WebKit to combat this.</p>
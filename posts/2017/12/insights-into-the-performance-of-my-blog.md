---
date: 2017-12-29 11:29:41+00:00
description: ''
layout: layouts/post
permalink: insights-into-the-performance-of-my-blog/
tags:
- post
title: Insights Into the Performance of My Blog
---

<p>A few months ago, I started working on <a href="https://chrishannah.me/notes-on-my-website-analytics-project/">my own analytics service</a> for my blog. I did this for many reasons, but ultimately for control and user privacy.</p>
<p>I only actually ever store four pieces of data:</p>
<ul>
<li>Website Title</li>
<li>URL</li>
<li>Referral URL (Only if it&#8217;s been given)</li>
<li>Date Accessed</li>
</ul>
<p>So while there&#8217;s not much data there, I can track everything I need, so like visits per day, per post, and I can get an idea of where traffic is coming from.</p>
<p>There have been occasions where the service, which I named &#8220;Minilytics&#8221;, has gone down though, so I can&#8217;t say I&#8217;ve tracked all the visits. But I&#8217;ve got a few things to share.</p>
<p><strong>Performance</strong></p>
<p>I made nice SQL query that shows me the performance of the site for each day. I use the view count for that day, and run it through a few conditions that will then output a string that I&#8217;ve manually set up. It&#8217;s not as exact as viewing the view count, but much easier to visualise.</p>
<div notitle class="cloudapp-embed" data-slug="oZ8G"><a href="https://cl.ly/oZ8G">Site Performance.mov</a><script async src="https://embed.cl.ly/embedded.gz.js" charset="utf-8"></script></div>
<p><strong>Monthly View Count</strong></p>
<p>Again, this isn&#8217;t <em>totally accurate</em> as these numbers may be higher and it hasn&#8217;t tracked them. But this simple count of views from each month, is a good way to check the general increase/decrease in visits over time.</p>
<div notitle class="cloudapp-embed" data-slug="oYeU"><a href="https://cl.ly/oYeU">Screen Shot 2017-12-29 at 10.28.33.png</a><script async src="https://embed.cl.ly/embedded.gz.js" charset="utf-8"></script></div>
<p>I&#8217;m going to try writing some more queries soon, and see what other insights I can pull from the data. But overall I think the site has been getting a lot more traffic recently! Especially since I moved the blog over to WordPress a few days ago. My guess is that the WordPress installation has better meta tags, descriptions, and stuff that search engines like.</p>
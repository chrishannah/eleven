---
categories:
- Mac
- Tip
date: 2020-01-06 22:36:43+00:00
description: ''
layout: layouts/post
permalink: how-to-expand-launchpad/
tags:
- Mac
- Tip
- post
title: How To Expand Launchpad
---

<p>Shihab Mehboob (<a href="https://twitter.com/jpeguin">@JPEGuin</a>) <a href="https://twitter.com/JPEGuin/status/1214282927883849730">shared a useful tip on Twitter</a>, where you can expand the amount of rows and columns in Launchpad.</p>
<p>Turns out you can do this by altering the following values via Terminal:</p>
<pre><code>defaults write com.apple.dock springboard-rows -int 8
defaults write com.apple.dock springboard-columns -int 8
</code></pre>
<p>For these changes to have effect, you&#8217;ll need to restart the Dock. You can do this via Activity Monitor or by typing <code>killall Dock</code>.</p>
<p>Here&#8217;s what mine looks like on my 16&#8243; MBP:</p>
<p><img src="https://chrishannah.me/images/2020/01/Screenshot-2020-01-06-at-22.23.10.png" alt="Launchpad" /></p>
<p>So much better than the massive icons that come by default.</p>

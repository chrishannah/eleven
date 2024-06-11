---
categories:
- App
- Development
- iOS
- Slate
date: 2018-01-23 23:14:36+00:00
description: ''
layout: layouts/post
permalink: slate-development-log/
tags:
- App
- Development
- iOS
- Slate
- post
title: 'Slate Development Log #1'
---

<p>As you may or may not know, I’ve been building my own iOS app for Manton Reece’s <a href="https://micro.blog">Micro.blog</a>.</p>
<p>A short description of Micro.blog, if you aren’t already familiar:</p>
<blockquote><p>A new social network and publishing platform for independent microblogs, created by Manton Reece.</p></blockquote>
<p>Development is going well, and I’m nearly ready to announce the first beta version, but I thought I’d write about the current progress, and what you can expect to see in the first beta version. This development log will hopefully become a regular thing as I add more features to the app.</p>
<h2>b0.1 &#8211; Read Only</h2>
<p>The <em>codename</em> for this version is “Read Only”, and that stems from the fact that it will not have any ability to write posts. That is something I want to spend a lot of time getting right, and shouldn’t hold back a beta version from being released.</p>
<p>Right now, there are 5 main sections in the app:</p>
<ul>
<li>Timeline</li>
<li>Mentions</li>
<li>Favourites</li>
<li>Discover</li>
<li>Profile</li>
</ul>
<p>The first four are pretty much the same, except they present different lists of posts. But they are what you’d imagine.</p>
<p>On each post in these lists, at the minute you see the name and username of the author, the posts content (of course), and the date. Each post also has a favourite/unfavourite button in the top-right corner. Swiping right to left on these cells, will show you the full conversation relevant to this post.</p>
<p>I currently also do some basic link detection in posts, and if there’s a @ mention with a link to their Micro.blog profile, it will navigate to their profile page. Anything else at the minute will launch inside a Safari View inside the app.</p>
<p>In the profile page, for yourself, or other users, you currently only see the name, username, photo, and also the number of people you are following. You cannot see how many followers you have in any case. Tapping the following will show a list of all of these users.</p>
<p>The app currently supports both methods of authentication, app token, and also by requesting an email that contains a link to open the app.</p>
<p>I started on a side menu as well, which at the minute simply shows the version number. But this will be expanded heavily in the future.</p>
<h3>What Else</h3>
<p>Of course one thing I need to add, is the ability to log out! It will be placed in the side menu.</p>
<p>I also want to expand the profile pages, by adding the bio, and also a link to their website. And also, features surrounding the user that I want to add, is the ability to tap on a users image to open their profile, and also the ability to follow and unfollow a user.</p>
<p>Finally, I need to make some icons for the overall app (most likely a quick draft for beta purposes), the different tabs, and also one for the menu.</p>
<h2>Screenshots</h2>
<p><a href="https://chrishannah.me/wp-content/uploads/2018/01/Image.png"><img loading="lazy" width="1024" height="450" class="aligncenter wp-image-1110 size-large" src="https://chrishannah.me/wp-content/uploads/2018/01/Image-1024x450.png" alt="" srcset="https://chrishannah.me/images/2018/01/Image-1024x450.png 1024w, https://chrishannah.me/images/2018/01/Image-300x132.png 300w, https://chrishannah.me/images/2018/01/Image-768x337.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" /></a></p>

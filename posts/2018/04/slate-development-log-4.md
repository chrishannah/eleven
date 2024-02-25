---
date: 2018-04-12 22:54:14+00:00
description: ''
layout: layouts/post
permalink: slate-development-log-4/
tags:
- post
title: 'Slate Development Log #4'
---

<p>Over the past few days I did a bit more work on Slate. I must say, it doesn’t really get regular attention. But it’s still improving!</p>
<p>The main feature I’ve been working on is the support for themes. I previously laid the ground work for this, with the three options being light, dark, and true black.</p>
<p><img loading="lazy" width="3766" height="2208" class="alignnone size-full wp-image-1205" src="https://chrishannah.me/wp-content/uploads/2018/04/1B396AE8-CB58-4D36-922B-AB5A34C302A1.png" srcset="https://cdn.chrishannah.me/images/2018/04/1B396AE8-CB58-4D36-922B-AB5A34C302A1.png 3766w, https://cdn.chrishannah.me/images/2018/04/1B396AE8-CB58-4D36-922B-AB5A34C302A1-300x176.png 300w, https://cdn.chrishannah.me/images/2018/04/1B396AE8-CB58-4D36-922B-AB5A34C302A1-768x450.png 768w, https://cdn.chrishannah.me/images/2018/04/1B396AE8-CB58-4D36-922B-AB5A34C302A1-1024x600.png 1024w" sizes="(max-width: 3766px) 100vw, 3766px" /></p>
<p>The app was originally designed to have a dark theme, so the way I’m initially testing it, is by analysing the colours as I go, while having the theme preference set as the light theme. This way I get an obvious sign on what interface elements I’ve moved over to the new system. After the bulk is done, I can then fine tune the colours, and test every theme to make sure they’re perfect.</p>
<p>A benefit of trying to separate the formatting of interface elements, is that I’m making views more generic (I think I say this in very development log). But I want to get to a point where, every interface element e.g. a post in a table, someone’s profile, or just as generic as a text field, has an explicit style. So the actual main application logic will just be placing these already formatted interfaces, in the right sections, with the correct data.</p>
<p>I do already have a lot of this going on in the app, with the conversation list, list of a user’s following, and a few other things, all using the exact same view controller. All it needs is an array of any type of object, and then it just asks the <code>CellFactory</code> for a cell that will suit it, and then it presents it.</p>
<p>As you can see form the screen shot, the profile view is looking a bit odd at the minute. It’s a mix of the colours and layout I think. I will definitely need to do some work on this.</p>
<p>And, one thing I keep forgetting about. I <em>still</em> need to work on inline images. They don’t actually appear at all at the minute, so it’s not even in a usable state for just reading Micro.blog!</p>
<p>It’s getting better though! Unfortunately, I’m just doing it a bit slowly.</p>
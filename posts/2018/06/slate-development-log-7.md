---
categories:
- Project
- Development
- Slate
date: 2018-06-08 23:24:22+00:00
description: ''
layout: layouts/post
permalink: slate-development-log-7/
tags:
- Project
- Development
- Slate
- post
title: 'Slate Development Log #7'
---

<p>Just a small update.</p>
<p>After putting a task in Slate off for at least a few months, I’ve got a big chunk of work out of the way, which makes future development so much easier.</p>
<p>Basically, when I first started developing the different sections (Timeline, Mentions, Discover, and Favourites), the code was completely split, and usually badly copied across classes.</p>
<p>I’ve done some work with protocols and inheritance, and now the before mentioned 4 parts of the app are using 99% the same code, except from the slight change in context. For example Mentions is exactly the same, other than a title change, and a few letters in the API endpoint.</p>
<p>As with most other people, WWDC is taking up a lot of time for me. So I think after I do just a tiny bit more work on composing posts, I’ll send another build out. I have composing working in my current build, but my 2 minimum requirements for the next public beta is a minimal version of Markdown formatting, and also replying to posts.</p>
---
categories:
- Project
- Website
date: 2017-07-11 22:12:50+00:00
description: ''
layout: layouts/post
permalink: notes-on-my-website-analytics-project/
tags:
- Project
- Website
- post
title: A Few Initial Notes on My Website Analytics Project
---

<div class="kg-card-markdown">
<p>I’ve done some minor researching into this idea of mine, that really became a thing when I started <a href="https://chrishannah.me/small-file-sizes-and-quick-load-times/">making my blog super lightweight</a>. And I really want to carry that over into whatever this project becomes.</p>
<p>Whatever I do, will of course be personally oriented, and it will be packed full of decisions that wouldn’t work best for most people. But it’s a personal project first, and if it becomes more flexible and open in the future, that’s just a bonus.</p>
<h2 id="whattotrack">What To Track</h2>
<p>With Google Analytics, you get a whole bunch of stats. This can be really handy for someone trying to deeply understand interactions with a website, but it’s a bit over the top for the menial use I want out of it. There’s also the added fact that <em>you’re tracking your users</em> — it’s not a big deal, but I’d rather not invade people’s privacy.</p>
<p>There are very minimal metrics that I want to capture, and that is page views, referrer websites, and possibly number of sessions &#8211; although I don’t care about this too much. But regarding the first two, this can be completed by simply telling something the page that’s been loaded, and what referred it. Luckily for me, it’s all in the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/title">HTML DOM</a> and I think I’ll be able to do this super minimally.</p>
<p>The way’s this basic data could be used is also rather interesting to me, as when the message is received (by a server,  or whatever), a date can be applied. Which means the data can be sorted by the date, collated into individual pages, and some pretty cool graphs could be made from it.</p>
<h2 id="howtodoit">How to do it</h2>
<p>For the sake of the front-end implementation, I plan this to be a simple PUT request, which will send the (as mentioned above) data to whatever server that is in control of the analytics. From there, it will require no more work from the client.</p>
<p>For the back-end, the speed, and “heaviness” of the implementation isn’t super important for me at the beginning stage. Because initially it will only serve myself, so it’s not a big load that will be put on it. But my first idea is to use a cloud server on <a href="https://m.do.co/c/30383193b89a">Digital Ocean</a>, to host a Swift server app! Built using <a href="https://www.perfect.org">Perfect</a>, because I had a great experience with it when I experimented with <a href="https://github.com/chrishannah/TextCase-API">a text formatting API</a>. There’s also the fact that I am mainly a Swift developer, and is more likely to get finished if I make use of that.</p>
<h2 id="progress">Progress</h2>
<p>As with all my other projects, I’ll be pretty vocal with the progress, and try to share as much as possible. This will be done mainly on Twitter, where you can follow me at <a href="http://twitter.com/chrishannah">@chrishannah</a>, and if you want to know something I haven’t shared yet, just ask!</p>
</div>
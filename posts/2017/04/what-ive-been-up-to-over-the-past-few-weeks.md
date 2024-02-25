---
categories:
- Command Line
- Programming
- Project
- Swift
- Terminal
date: 2017-04-04 19:55:59+00:00
description: ''
layout: layouts/post
permalink: what-ive-been-up-to-over-the-past-few-weeks/
tags:
- Command Line
- Programming
- Project
- Swift
- Terminal
- post
title: What I've Been Up to Over the Past Few Weeks
---

<div class="kg-card-markdown">
<p>It&rsquo;s been a while since I actually wrote something, and that&rsquo;s mainly because of my university work that&rsquo;s been piling up (I finish this June!), and also because I&rsquo;ve been developing a few mini projects with Swift. The latter is what I&rsquo;m going to be writing about today.</p>
<p>Basically, over the past few weeks I&rsquo;ve been getting back into using the command line more. Why is a hard question, but mainly because I&rsquo;m a nerd, and it&rsquo;s pretty fun!</p>
<p>It started when I kept seeing a trend of more of the people I follow on Twitter, either retweet or post GIFs of command line apps. It also led me to <a href="https://hyper.is">Hyper</a>, which is a terminal application, and it&rsquo;s actually built using JavaScript, HTML, and CSS. You can also customise it a ton, especially with the <a href="https://hyperthemes.matthi.coffee">massive amount of themes available</a>.</p>
<p><img class="alignnone size-full wp-image-444" src="https://chrishannah.me/wp-content/uploads/2017/04/Screen-Shot-2017-04-04-at-20-03-32.png" alt=""/></p>
<p>I personally, have Hyper set up with the <code>hyper-ayu</code> theme, and my favourite monospaced font, SF Mono.</p>
<p>This is getting a bit too meta, so I&rsquo;ll bring it back on topic.</p>
<p>So I&rsquo;ve actually developed four command line applications in the past two weeks, and they&rsquo;ve all been build using Xcode/Swift<sup class="footnote-ref"><a id="fnref1" href="#fn1">[1]</a></sup>. The apps themselves are unix executable files, that can just be double-clicked and ran, but on each project I include more helpful installation/usage information.</p>
<h2 id="cwiki">cwiki</h2>
<p><em>(Not to be mistaken with my macOS app, Qwiki)</em></p>
<p>This is the first one I made, and it was probably the easiest of them all. That&rsquo;s because the majority of the code I could just reuse from my already released app, <a href="http://getqwiki.co">Qwiki</a>! This app, <strong>cwiki</strong> , is just a super minimal version of that app.</p>
<p><img title="cwiki gif" src="https://github.com/chrishannah/cwiki/raw/master/cwiki.gif?raw=true" alt="" /></p>
<p>You just type <code>cwiki</code> followed by a search query, and it will print out the most relevant matches. It does however, only print out a basic description of the articles.</p>
<p>Check out <a href="https://github.com/chrishannah/cwiki"><strong>cwiki</strong> on GitHub</a>.</p>
<h2 id="slink">slink</h2>
<p>So after the first project, I was a bit more intrigued, I decided to make a more interactive app. <strong>slink</strong> is purely a URL shortener that uses the <a href="http://Goo.gl">Goo.gl</a> API, but this lets you shorten, and also expand (<a href="http://Goo.gl">Goo.gl</a>) shortened links.</p>
<p><img title="slink gif" src="https://github.com/chrishannah/slink/raw/master/2017-03-23%2020_38_29.gif?raw=true" alt="" /></p>
<p>The slightly more complex functionality than before, led me to work out how options are managed in command line apps. So if you want to shorten or expand a link, just use either <code>-s</code>, <code>--shorten</code>, <code>-e</code>, or <code>--expand</code>. I also made a mini usage guide, that you can print out using <code>-h</code> or <code>--help</code> &#x1F913;.</p>
<p>Check out <a href="https://github.com/chrishannah/slink"><strong>slink</strong> on GitHub</a>.</p>
<h2 id="hacker">hacker</h2>
<p>The third project was a bit similar to the first two, in that it made use of a few different options to return different data, but it also presented it like cwiki.</p>
<p><img title="hacker gif" src="https://github.com/chrishannah/hacker/raw/master/2017-03-27%2011_46_13.gif?raw=true" alt="" /></p>
<p>It&rsquo;s a basic interface for <a href="https://news.ycombinator.com">Hacker News</a>, and by making use of the various options, you can retrieve the new, top, and best lists.</p>
<p>Check out <a href="https://github.com/chrishannah/hacker"><strong>hacker</strong> on GitHub</a>.</p>
<h2 id="titlecase">TitleCase</h2>
<p>Okay this one is <em>really</em> simple, it makes use of Brett Terpstra&rsquo;s <a href="http://brettterpstra.com/2015/12/15/the-titlecase-api/">TitleCase API</a>, which formats a given string of text to the AP Title Case style. I actually find these types of tools perfect when writing a blog post, as usually the title is formatted incorrectly.</p>
<p><img title="TitleCase gif" src="https://github.com/chrishannah/TitleCase/raw/master/2017-04-01%2020_32_23.gif?raw=true" alt="" /></p>
<p>The API was probably the easiest one I&rsquo;ve ever used. But then again, there was only one parameter, no options, and one return type.</p>
<p>Check out <a href="https://github.com/chrishannah/TitleCase"><strong>TitleCase</strong> on GitHub</a>.</p>
<hr />
<p>Now I guess everyone knows what I&rsquo;ve been up to, so I can get back to slaving away over university work, and making some random projects!</p>
<p><em>P.S. I actually have some other really great news that I&rsquo;m going to share here soon, but I&rsquo;m just waiting on it being finalised a bit more.</em></p>
<hr class="footnotes-sep" />
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item">My favourite programming language &#x1F60D;. <a class="footnote-backref" href="#fnref1">&#x21A9;&#xFE0E;</a></li>
</ol>
</section>
</div>
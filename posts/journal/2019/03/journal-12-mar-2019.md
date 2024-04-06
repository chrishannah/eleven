---
date: 2019-03-12 22:47:40+00:00
description: ''
layout: layouts/post
permalink: journal-12-mar-2019/
tags:
- post

title: 'Journal: 12 Mar 2019'
---

<p>I&#8217;ll skip talking about my day job today, as there really isn&#8217;t anything exciting to talk about.</p>
<p>However, on my blog, I published three different pieces today. Not three major articles, but three different things. Firstly, I shared a story from Laurie Voss (Co-founder and Chief Data Office of NPM) about <a href="https://chrishannah.me/a-major-bank-accidentally-published-private-code-to-the-public-npm-registry/">a major bank that accidentally pushed private code to the public NPM registry</a>. Then I found this headline &#8211; <a href="https://chrishannah.me/amazons-alexa-has-80000-apps-and-no-runaway-hit-→/">&#8220;Amazon’s Alexa has 80,000 Apps—and No Runaway Hit&#8221; on Bloomberg</a> and had to link to it. And I also saw that Professor Stephen Hawking is being commemorated on the new 50p coin, so <a href="https://chrishannah.me/prof-stephen-hawking-commemorated-on-new-50p-coin-→/">I had to share that as well</a>.</p>
<p>From a developer perspective, I pushed another build to the Text Case beta. There&#8217;s no new features in this build, but I worked on a lot of optimisations to how the UI is drawn. Especially as all content needs to be updated every time a user types in the input field, or uses the &#8220;Use Copied Text&#8221; button. Before there was some weird glitch-like behaviour, where the coloured headings would flash different colours. This is because the interface elements are &#8220;reused&#8221;, so when they&#8217;re reloaded, old components would be cleaned and configured to load the list from scratch. That wasn&#8217;t exactly necessary though, as it&#8217;s only the text content <em>inside</em> the interface that needs to be updated, so I&#8217;ve got a lot of manual UI handling for that now.</p>
<p>Another thing I did notice in the Text Case build I shared recently with custom icons, is that they&#8217;re not that optimised for all screen sizes. And for some reason the edges on the &#8220;TC&#8221; seem quite harsh. I plan on getting that fixed very soon.</p>
<p>Then it will be time to implement a &#8220;Text to Emoji&#8221; format, because I&#8217;m 80% sure I&#8217;m going to add it. After that I may start wrapping up the 2.0 version. Although I want as much to be in the update as possible, I really want users to use the new app. And simply adding useless things to the app is not going to benefit anyone.</p>

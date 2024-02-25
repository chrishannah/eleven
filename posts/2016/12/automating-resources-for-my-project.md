---
categories:
- Automation
- macOS
- university
date: 2016-12-01 12:13:53+00:00
description: ''
layout: layouts/post
permalink: automating-resources-for-my-project/
tags:
- Automation
- macOS
- university
- post
title: Automating Resources for my Project
---

<div class="kg-card-markdown">
<p>I just set up a nice little automation on my Mac that I just had to share with everyone, it&#8217;s quite small, but it&#8217;s a big help to me when writing my project report for university.</p>
<p>I&#8217;m writing it in iA Writer at the minute, and I&#8217;m certainly making full use of the content blocks for things like images, and referencing separate bits of text. But I wanted a way to take a screenshot, and then have it available to me to embed into the document. It meant I had to google a few things about AppleScript, but that seemed pretty simple.</p>
<p>To keep my project folder nice and tidy, I created a new folder inside it called &#8220;Resources&#8221;. At the minute it&#8217;s just for images, but who knows!</p>
<p>Then I created a new rule in Hazel, to detect any file in my Inbox folder<sup class="footnote-ref"><a id="fnref1" href="#fn1">[1]</a></sup> that has the tag &#8220;KeepTrack&#8221;<sup class="footnote-ref"><a id="fnref2" href="#fn2">[2]</a></sup>, which then moves it into the appropriate Resources folder that I just created. It then runs a small bit of AppleScript to copy the correct text to my clipboard, that I can then paste into iA Writer.</p>
<pre><code class="language-AppleScript">set the clipboard to "/Resources/" &amp; item 1 of inputAttributes
</code></pre>
<p>The inputAttributes is the variable Hazel provides, and I have only set one item to pass through, the full name of the file that was matched, so &#8220;Image.png&#8221; could be one.</p>
<p>Then I&#8217;ll get something like <code>/Resources/Image.png</code> in my clipboard, that iA Writer will accept as a content block and show the image!</p>
<h2 id="hazelrule">Hazel Rule</h2>
<p><img class="alignnone size-full wp-image-566" src="https://chrishannah.me/wp-content/uploads/2017/12/Screen-Shot-2016-12-01-at-11-59-17-1.png"/></p>
<p>So it&#8217;s not a grand automation workflow, but it&#8217;s something that I worked out due to the fantastic capabilities of Hazel!</p>
<p>I&#8217;m starting to really love the app, and it&#8217;s allowing me to automate my work on my Mac even more.</p>
<p>If you want to get Hazel yourself, you can find it on the <a href="https://www.noodlesoft.com/store">Noodlesoft Store</a>.</p>
<hr class="footnotes-sep" />
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item">This is a folder on my desktop, that I use to quickly throw files into. I pretty much have all of my rules in this folder. <a class="footnote-backref" href="#fnref1">↩︎</a></li>
<li id="fn2" class="footnote-item">The name of my project. <a class="footnote-backref" href="#fnref2">↩︎</a></li>
</ol>
</section>
</div>
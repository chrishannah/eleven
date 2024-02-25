---
categories:
- Programming
- Swift
date: 2017-06-25 21:24:32+00:00
description: ''
layout: layouts/post
permalink: ive-been-writing-server-side-swift/
tags:
- Programming
- Swift
- post
title: I’ve Been Writing Server-Side Swift!
---

<div class="kg-card-markdown">
<p>I made my first API today, and I used Swift to do it!</p>
<p>Basically, I got bored this afternoon and decided to have a little research into server-side Swift programming. I’ve heard about this before, but I’ve not gone too deep into it myself.</p>
<p>The problem with me tying things like this, is that I ever really have a good idea, or scenario which I could use to learn the new thing. Well as you may already know, I’m <em>slowly</em> working on a title casing application for iOS and macOS, and therefore I’ve already created a few functions to format text.</p>
<p>So far the base TextCase functions are:</p>
<ul>
<li>Uppercase</li>
<li>Lowercase</li>
<li>Title Case</li>
<li>URL Encoding</li>
<li>Mocking SpongeBob (yes, like the meme)</li>
</ul>
<p>From these formats, the only ones I could see being useful are Title casing, and the fun SpongeBob format.</p>
<p>From making use of various APIs myself, I knew that all I needed was a super simple HTTP server, which had support for a few GET requests.</p>
<p><a href="http://perfect.org">Perfect</a> was the tool I used to write the server side code, and I found a quick tutorial which explained the basic HTTP server that I needed. I must say it was really easy for me to create this, as I’m already familiar with Swift, so the only thing to learn was the “Perfect” way of doing things.</p>
<p>Because it was in Swift, I could also reuse my main TextCase class which handles the formatting. There was a slight exception, where the <code>arc4random_uniform</code> function isn’t available on Linux, but I found a <a href="https://gist.github.com/rymcol/48a505c2a1c874daea52a296a2687f5f">Linux suitable replacement</a> for this.</p>
<p>There are also a few more reasons why I wanted to try this out, but they’re rather meta. For example, I’m a big fan of Swift, and it feels good working with “low-level” Swift if you can really call it that, and also because I just love the look of Swift in the default Xcode theme, with the SF Mono font 😍 (weird, I know, but it’s the truth).</p>
<p>The final code (as in what I’ve done so far), is three endpoints, which are actually just two. <code>/title/{input text}</code> is to return the given text in title casing, <code>/spongebob/{input text}</code> is for the SpongeBob case. The third one is just <code>/{input text}</code>, and it returns the text in every format available, which is just the two I mentioned so far. The results are in plain JSON, and also include the plain value that was sent in the request.</p>
<p>For example, here is an example response to the <code>/</code> endpoint:</p>
<pre><code class="language-JSON">{
    &quot;plain&quot; : &quot;what the hell is this&quot;,
    &quot;title&quot; : &quot;What the Hell Is This&quot;,
    &quot;spongebob&quot; : &quot;wHAT ThE Hell iS thiS&quot;
}
</code></pre>
<p>Anyway, you can view the project <a href="https:/github.com/chrishannah/TextCase-API">over at GitHub</a>, and if you want to suggest any new formats (or even write some yourself), just let me know <a href="http://twitter.com/chrishannah">on Twitter at @chrishannah</a></p>
</div>
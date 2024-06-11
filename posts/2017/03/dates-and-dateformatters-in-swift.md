---
categories:
- Guide
- Swift
- Swift Basics
date: 2017-03-08 13:51:42+00:00
description: ''
image: https://chrishannah.me/images/2017/03/dates-1.png
layout: layouts/post
permalink: dates-and-dateformatters-in-swift/
tags:
- Guide
- Swift
- Swift Basics
- post
title: Dates and DateFormatters in Swift
---

<div class="kg-card-markdown">
<p><em>This article is part of a collection of articles about <a href="http://radicalthinker.net/tag/swift-basics/">Swift Basics</a>, where I try to explain different parts of Swift development in a more understandable way.</em></p>
<hr />
<p>While doing some development in Swift, using Dates and DateFormatters, I found the task of going through every format option quite boring. So this is a quick &#8220;cheatsheet&#8221;, that anyone can use to identify what style of Date/Time they want to display, and also the code to get it.</p>
<p>Of course, you first need to create a <strong><code>Date</code></strong> object, which used in this way will generate the current date/time. Then you will also need a <strong><code>DateFormatter</code></strong> object, which handles the formatting, and is used to output the result into a usable <strong><code>String</code></strong>.</p>
<div class="language-swift">
<pre><code>let date = Date()
let dateFormatter = DateFormatter()
</code></pre>
</div>
<h1 id="date">Date</h1>
<h2 id="fulldate">Full Date</h2>
<p><strong>Output</strong>: <code>Wednesday, March 8, 2017</code></p>
<p><strong>Code</strong>:</p>
<div class="language-swift">
<pre><code>let date = Date()
let dateFormatter = DateFormatter()
dateFormatter.dateStyle = .full
let stringOutput = dateFormatter.string(from: date)
</code></pre>
</div>
<h2 id="longdate">Long Date</h2>
<p><strong>Output</strong>: <code>March 8, 2017</code></p>
<p><strong>Code</strong>:</p>
<div class="language-swift">
<pre><code>let date = Date()
let dateFormatter = DateFormatter()
dateFormatter.dateStyle = .long
let stringOutput = dateFormatter.string(from: date)
</code></pre>
</div>
<h2 id="mediumdate">Medium Date</h2>
<p><strong>Output</strong>: <code>Mar 8, 2017</code></p>
<p><strong>Code</strong>:</p>
<div class="language-swift">
<pre><code>let date = Date()
let dateFormatter = DateFormatter()
dateFormatter.dateStyle = .medium
let stringOutput = dateFormatter.string(from: date)
</code></pre>
</div>
<h2 id="shortdate">Short Date</h2>
<p><strong>Output</strong>: <code>3/8/17</code></p>
<p><strong>Code</strong>:</p>
<div class="language-swift">
<pre><code>let date = Date()
let dateFormatter = DateFormatter()
dateFormatter.dateStyle = .short
let stringOutput = dateFormatter.string(from: date)
</code></pre>
</div>
<h1 id="time">Time</h1>
<h2 id="fulltime">Full Time</h2>
<p><strong>Output</strong>: <code>1:26:32 PM Greenwich Mean Time</code></p>
<p><strong>Code</strong>:</p>
<div class="language-swift">
<pre><code>let date = Date()
let dateFormatter = DateFormatter()
dateFormatter.timeStyle = .full
let stringOutput = dateFormatter.string(from: date)
</code></pre>
</div>
<h2 id="longtime">Long Time</h2>
<p><strong>Output</strong>: <code>1:26:32 PM GMT</code></p>
<p><strong>Code</strong>:</p>
<div class="language-swift">
<pre><code>let date = Date()
let dateFormatter = DateFormatter()
dateFormatter.timeStyle = .long
let stringOutput = dateFormatter.string(from: date)
</code></pre>
</div>
<h2 id="mediumtime">Medium Time</h2>
<p><strong>Output</strong>: <code>1:26:32 PM</code></p>
<p><strong>Code</strong>:</p>
<div class="language-swift">
<pre><code>let date = Date()
let dateFormatter = DateFormatter()
dateFormatter.timeStyle = .medium
let stringOutput = dateFormatter.string(from: date)
</code></pre>
</div>
<h2 id="shorttime">Short Time</h2>
<p><strong>Output</strong>: <code>1:26 PM</code></p>
<p><strong>Code</strong>:</p>
<div class="language-swift">
<pre><code>let date = Date()
let dateFormatter = DateFormatter()
dateFormatter.timeStyle = .short
let stringOutput = dateFormatter.string(from: date)
</code></pre>
</div>
<h1 id="dateandtime">Date and Time</h1>
<p>You can of course, use the <code>dateFormat</code> and <code>timeFormat</code> together to output the date and time in the same string.</p>
<p>Here is an example:</p>
<p><strong>Output</strong>: <code>March 8, 2017 at 1:37 PM</code></p>
<p><strong>Code</strong>:</p>
<div class="language-swift">
<pre><code>let date = Date()
let dateFormatter = DateFormatter()
dateFormatter.dateStyle = .long
dateFormatter.timeStyle = .short
let stringOutput = dateFormatter.string(from: date)
</code></pre>
</div>
<h3 id="download">Download</h3>
<p>I&#8217;ve made a Swift Playground containing all of the formats for date and time, which you can use yourself by <a href="https://gist.github.com/chrishannah/003fa09a44649731c20cbdf788257316">copying the code from GitHub</a>.</p>
</div>
